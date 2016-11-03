using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Spann.Core.DataAccess;
using System.Runtime.Remoting.Messaging;
using System.Reflection;
using Spann.Core.DomainModel;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DataAccess.BaseDomainModel;
using System.Collections;

namespace Spann.RepositoryModel
{
    public enum CommitTypeEnum
    {
        ADD, REMOVE, UPDATE, PATCH
    }

    public class BaseRepositoryManager<DMSource> : IRepositoryManager<BaseRepositoryManager<DMSource>, DMSource>
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
        #region Private Constant(s).
        private static readonly string ACTION_NAME = "Commit";
        #endregion

        #region Public Field(s).
        public delegate void ChangeListener();
        #endregion

        #region Private Field(s).
        private List<DMSource> models;
        private Dictionary<Guid, ChangeListener> listeners;
        #endregion

        #region Public Constructor(s).
        public BaseRepositoryManager()
        {
            models = new List<DMSource>();
            listeners = new Dictionary<Guid, ChangeListener>();
        }
        #endregion

        #region Public Function(s).
        public void AddChangeListener(Guid uid, ChangeListener listener)
        {
            listeners.Add(uid, listener);
            RunAsyncListener(listener);
        }

        public void RemoveChangeListener(Guid uid)
        {
            listeners.Remove(uid);
        }

        private void Mixed(DMSource model)
        {
            var accessor = DC.Accessor<DMSource>();
            RunChildActions(accessor, model);
        }

        public void Commit(CommitTypeEnum commitType, DMSource model)
        {
            var accessor = DC.Accessor<DMSource>();
            switch (commitType)
            {
                case CommitTypeEnum.ADD:
                    Add(accessor, model);
                    break;
                case CommitTypeEnum.REMOVE:
                    Delete(accessor, model.ID);
                    break;
                case CommitTypeEnum.UPDATE:
                    break;
                case CommitTypeEnum.PATCH:
                    RunChildActions(accessor, model);
                    break;
                default:
                    break;
            }
            accessor.Dispose();
            NotifyChangeListeners();
        }

        public DMSource Pull(Expression<Func<DMSource, bool>> filter, bool WithDetails = false)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = Get(accessor, filter);
            if (WithDetails)
            {
                PopulateDetails(accessor, result);
            }
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public List<DMSource> PullAll(bool WithDetails = false)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor, null);
            if (WithDetails)
            {
                result.ForEach(model =>
                {
                    PopulateDetails(accessor, model);
                });
            }
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public List<DMSource> PullAll(Expression<Func<DMSource, bool>> filter, bool WithDetails = false)
        {
            var accessor = DC.Accessor<DMSource>();
            List<DMSource> result = GetAll(accessor, filter);
            if (WithDetails)
            {
                result.ForEach(model =>
                {
                    PopulateDetails(accessor, model);
                });
            }
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        private List<DMSource> GetByConnection(ConnectionDM connection)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor, (item) => item.ID == connection.ChildID);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        private void Add(DataAccessor<DMSource> accessor, DMSource model)
        {
            RunChildActions(accessor, model);
            if (accessor.DATA_MAP.HasConnections)
            {
                accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
                {
                    foreach (IDataModel connectionModel in accessor.DATA_MAP.ConnectionValue(connectionType, model))
                    {
                        ExicuteNextChain(PatchTypeEnum.CREATE, accessor, connectionType, model, connectionModel);
                    }
                });
            }
        }

        private DMSource Get(DataAccessor<DMSource> accessor, Expression<Func<DMSource, bool>> filter)
        {
            var result = models.Find(msg => filter.Compile()(msg));
            if (result == null)
            {
                result = accessor.LoadAll(filter).First();
                if (result != null)
                {
                    models.Add(result);
                }
            }
            return result;
        }

        private List<DMSource> GetAll(DataAccessor<DMSource> accessor, Expression<Func<DMSource, bool>> filter)
        {
            var result = accessor.LoadAll(filter);
            if (result != null)
            {
                models.AddRange(result);
            }
            return result;
        }

        private void Delete(DataAccessor<DMSource> accessor, int id)
        {
            models.RemoveAll(source => source.ID == id);
            accessor.DeleteObject(id);
        }

        private void Update(DataAccessor<DMSource> accessor, DMSource model)
        {
            var items = models.Where(source => source.ID == model.ID);
            accessor.UpdateObject(model);
        }
        #endregion

        #region Private Function(s).
        private void NotifyChangeListeners()
        {
            listeners.Values.ToList().ForEach(RunAsyncListener);
        }

        private void RunAsyncListener(ChangeListener listener)
        {
            listener.BeginInvoke((ar) =>
            {
                AsyncResult result = (AsyncResult)ar;
                ChangeListener caller = (ChangeListener)result.AsyncDelegate;
                caller.EndInvoke(ar);
            }, null);
        }

        private void RunChildActions(DataAccessor<DMSource> accessor, DMSource model)
        {
            var patchData = PatchTools.GetPatchData(model);
            if (patchData.PatchType == PatchTypeEnum.CREATE)
            {
                accessor.CreateObject(model);
            }
            else if (patchData.PatchType == PatchTypeEnum.UPDATE)
            {
                accessor.UpdateObject(model);
            }
            else if (patchData.PatchType == PatchTypeEnum.DELETE)
            {
                accessor.DeleteObject(model.ID);
            }

            accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
            {
                foreach (IDataModel connectionModel in accessor.DATA_MAP.ConnectionValue(connectionType, model))
                {
                    if (connectionModel.PatchType != null)
                    {
                        ExicuteNextChain(PatchTypeEnum.GetType(connectionModel.PatchType), 
                            accessor, connectionType, model, connectionModel);
                    }
                }
            });
        }

        private MethodInfo GetMethod(Type managerType, Type modelType)
        {
            return managerType.GetRuntimeMethod(ACTION_NAME, new Type[] { typeof(CommitTypeEnum), modelType });
        }

        private void ExicuteNextChain(PatchTypeEnum type, DataAccessor<DMSource> accessor, Type connectionType,
            DMSource model, IDataModel connectionModel)
        {
            switch (type.EnumValue)
            {
                case PatchTypeEnum.Enum.Create:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.ADD, connectionModel });
                        accessor.CreateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
                        break;
                    }
                case PatchTypeEnum.Enum.Update:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.UPDATE, connectionModel });
                        accessor.UpdateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
                        break;
                    }
                case PatchTypeEnum.Enum.Delete:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.REMOVE, connectionModel });
                        accessor.DeleteConnection(model.GetConnectionID(connectionType, connectionModel.ID));
                        break;
                    }
                default:
                    break;
            }
        }

        private void PopulateDetails(DataAccessor<DMSource> accessor, DMSource result)
        {
            accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
            {
                Type managerType = RC.GetManagerType(connectionType);
                var method = managerType.GetMethod("GetByConnection", BindingFlags.NonPublic | BindingFlags.Instance);

                var connections = accessor.LoadConnections((connection) => connection.ParentID == result.ID,
                    result, accessor.DATA_MAP.Connection(connectionType));
                connections.ForEach(connection =>
                {
                    IList children = method.Invoke(RC.GetManager(connectionType), new object[] {
                                connection
                            }) as IList;
                    var items = accessor.DATA_MAP.Connection(connectionType).Property.GetValue(result) as IList;
                    foreach (var child in children)
                    {
                        items.Add(child);
                    }
                });
            });
        }
        #endregion

        //class CommitActionMap
        //{
        //    private static readonly string ACTION_NAME = "Commit";

        //    public delegate void DataModelAction(DataAccessor<DMSource> accessor, Type t, DMSource model, IDataModel item);

        //    private static Dictionary<int, CommitActionMap> Values = new Dictionary<int, CommitActionMap>();

        //    public static CommitActionMap CREATE = new CommitActionMap(1, PatchType.CREATE, (accessor, connectionType, model, connectionModel) =>
        //    {
        //        Type managerType = RC.GetManagerType(connectionType);
        //        var method = GetMethod(managerType, connectionType);
        //        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.ADD, connectionModel });
        //        accessor.CreateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
        //    });

        //    public static CommitActionMap UPDATE = new CommitActionMap(2, PatchType.UPDATE, (accessor, connectionType, model, connectionModel) =>
        //    {
        //        Type managerType = RC.GetManagerType(connectionType);
        //        var method = GetMethod(managerType, connectionType);
        //        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.UPDATE, connectionModel });
        //        accessor.UpdateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
        //    });

        //    public static CommitActionMap DELETE = new CommitActionMap(3, PatchType.DELETE, (accessor, connectionType, model, connectionModel) =>
        //    {
        //        Type managerType = RC.GetManagerType(connectionType);
        //        var method = GetMethod(managerType, connectionType);
        //        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.REMOVE, connectionModel });
        //        accessor.DeleteConnection(model.GetConnectionID(connectionType, connectionModel.ID));
        //    });

        //    private static MethodInfo GetMethod(Type managerType, Type modelType)
        //    {
        //        return managerType.GetRuntimeMethod(ACTION_NAME, new Type[] { typeof(CommitTypeEnum), modelType });
        //    }

        //    private PatchType PatchType;
        //    public DataModelAction Action { get; private set; }
        //    private CommitActionMap(int key, PatchType patchType, DataModelAction action)
        //    {
        //        this.PatchType = patchType;
        //        this.Action = action;

        //        // Register Commit Action.
        //        Values[key] = this;
        //    }

        //    public static void Create(DataAccessor<DMSource> accessor, DMSource model)
        //    {
        //        accessor.CreateObject(model);
        //    }

        //    public static void Update(DataAccessor<DMSource> accessor, DMSource model)
        //    {
        //        accessor.UpdateObject(model);
        //    }

        //    public static void Delete(DataAccessor<DMSource> accessor, DMSource model)
        //    {
        //        accessor.DeleteObject(model.ID);
        //    }

        //    public static void Run(DataAccessor<DMSource> accessor, DMSource model)
        //    {
        //        var patchData = PatchTools.GetPatchData(model);
        //        if(patchData.PatchType == PatchType.CREATE)
        //        {
        //            Create(accessor, model);
        //        }
        //                else if (patchData.PatchType == PatchType.UPDATE)
        //        {
        //            Update(accessor, model);
        //        }
        //        else if (patchData.PatchType == PatchType.DELETE)
        //        {
        //            Delete(accessor, model);
        //        }

        //        accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
        //        {
        //            foreach (IDataModel connectionModel in accessor.DATA_MAP.ConnectionValue(connectionType, model))
        //            {
        //                if(connectionModel.PatchType != null)
        //                {
        //                    Values.Values.First(action => action.PatchType == PatchType.GetType(connectionModel.PatchType))
        //                        .Action.Invoke(accessor, connectionType, model, connectionModel);
        //                }
        //            }
        //        });
        //    }
        //}
    }
}
