using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Spann.Core.DataAccess;
using System.Runtime.Remoting.Messaging;
using System.Reflection;
using Spann.Core.Requests.Patch;
using Spann.Core.DomainModel;

namespace Spann.RepositoryModel
{
    public enum CommitTypeEnum
    {
        ADD, REMOVE, UPDATE, PATCH
    }

    public class BaseRepositoryManager<DMSource> : IRepositoryManager<BaseRepositoryManager<DMSource>, DMSource> 
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
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
            CommitActionMap.Run(accessor, model);
        }

        public void Commit(CommitTypeEnum commitType, DMSource model)
        {
            var accessor = DC.Accessor<DMSource>();
            switch(commitType)
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
                    CommitActionMap.Run(accessor, model);
                    break;
                default:
                    break;
            }
            accessor.Dispose();
            NotifyChangeListeners();
        }

        public DMSource Pull(Expression<Func<DMSource, bool>> filter)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = Get(accessor, filter);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public List<DMSource> PullAll()
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public List<DMSource> PullAll(Expression<Func<DMSource, bool>> filter)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor, filter);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        private void Add(DataAccessor<DMSource> accessor, DMSource model)
        {
            CommitActionMap.Create(accessor, model);
            if (accessor.DATA_MAP.HasConnections)
            {
                accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
                {
                    foreach (IDataModel connectionModel in accessor.DATA_MAP.ConnectionValue(connectionType, model))
                    {
                        CommitActionMap.CREATE.Action.Invoke(accessor, connectionType, model, connectionModel);
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

        private List<DMSource> GetAll(DataAccessor<DMSource> accessor)
        {
            var result = accessor.LoadAll();
            if (result != null)
            {
                models.AddRange(result);
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
        #endregion

        class CommitActionMap
        {
            private static readonly string ACTION_NAME = "Commit";

            public delegate void DataModelAction(DataAccessor<DMSource> accessor, Type t, DMSource model, IDataModel item);

            private static Dictionary<int, CommitActionMap> Values = new Dictionary<int, CommitActionMap>();

            public static CommitActionMap CREATE = new CommitActionMap(1, PatchTypeEnum.CREATE, (accessor, connectionType, model, connectionModel) =>
            {
                Type managerType = RC.GetManagerType(connectionType);
                var method = GetMethod(managerType, connectionType);
                method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.ADD, connectionModel });
                accessor.CreateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
            });

            public static CommitActionMap UPDATE = new CommitActionMap(2, PatchTypeEnum.UPDATE, (accessor, connectionType, model, connectionModel) =>
            {
                Type managerType = RC.GetManagerType(connectionType);
                var method = GetMethod(managerType, connectionType);
                method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.UPDATE, connectionModel });
                accessor.UpdateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
            });

            public static CommitActionMap DELETE = new CommitActionMap(3, PatchTypeEnum.DELETE, (accessor, connectionType, model, connectionModel) =>
            {
                Type managerType = RC.GetManagerType(connectionType);
                var method = GetMethod(managerType, connectionType);
                method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.REMOVE, connectionModel });
                accessor.DeleteConnection(model.GetConnectionID(connectionType, connectionModel.ID));
            });

            private static MethodInfo GetMethod(Type managerType, Type modelType)
            {
                return managerType.GetRuntimeMethod(ACTION_NAME, new Type[] { typeof(CommitTypeEnum), modelType });
            }

            private PatchTypeEnum PatchType;
            public DataModelAction Action { get; private set; }
            private CommitActionMap(int key, PatchTypeEnum patchType, DataModelAction action)
            {
                this.PatchType = patchType;
                this.Action = action;

                // Register Commit Action.
                Values[key] = this;
            }

            public static void Create(DataAccessor<DMSource> accessor, DMSource model)
            {
                accessor.CreateObject(model);
            }

            public static void Update(DataAccessor<DMSource> accessor, DMSource model)
            {
                accessor.UpdateObject(model);
            }

            public static void Delete(DataAccessor<DMSource> accessor, DMSource model)
            {
                accessor.DeleteObject(model.ID);
            }

            public static void Run(DataAccessor<DMSource> accessor, DMSource model)
            {
                var patchData = PatchTools.GetPatchData(model);
                if(patchData.PatchType == PatchTypeEnum.CREATE)
                {
                    Create(accessor, model);
                }
                        else if (patchData.PatchType == PatchTypeEnum.UPDATE)
                {
                    Update(accessor, model);
                }
                else if (patchData.PatchType == PatchTypeEnum.DELETE)
                {
                    Delete(accessor, model);
                }

                accessor.DATA_MAP.ConnectionTypes.ForEach(connectionType =>
                {
                    foreach (IDataModel connectionModel in accessor.DATA_MAP.ConnectionValue(connectionType, model))
                    {
                        if(connectionModel.PatchType != null)
                        {
                            Values.Values.First(action => action.PatchType == PatchTypeEnum.GetType(connectionModel.PatchType))
                                .Action.Invoke(accessor, connectionType, model, connectionModel);
                        }
                    }
                });
            }
        }
    }
}
