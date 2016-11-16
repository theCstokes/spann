using Spann.Core.DataAccess;
using Spann.Core.DataAccess.BaseDomainModel;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace Spann.RepositoryModel.RepositoryManagers
{
    public abstract class BaseRepositoryManager<T, DMSource> : IRepositoryManager<T, DMSource>
        where T : new()
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
        #region Private Constant(s).
        protected static readonly string ACTION_NAME = "Commit";
        #endregion

        #region Public Field(s).
        public delegate void ChangeListener();
        #endregion

        #region Private Field(s).
        protected List<DMSource> models;
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

        private List<DMSource> GetByConnection(ConnectionDM connection)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor, (item) => item.ID == connection.ChildID);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        protected DMSource Get(DataAccessor<DMSource> accessor, Expression<Func<DMSource, bool>> filter)
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

        protected List<DMSource> GetAll(DataAccessor<DMSource> accessor, 
            Expression<Func<DMSource, bool>> filter)
        {
            var result = accessor.LoadAll(filter);
            if (result != null)
            {
                models.AddRange(result);
            }
            return result;
        }

        protected void Delete(DataAccessor<DMSource> accessor, int id)
        {
            models.RemoveAll(source => source.ID == id);
            accessor.DeleteObject(id);
        }

        protected void Update(DataAccessor<DMSource> accessor, int id, DMSource model)
        {
            //var items = models.Where(source => source.ID == id);
            model.ID = id;
            accessor.UpdateObject(model);
        }
        #endregion

        #region Private Function(s).
        protected void NotifyChangeListeners()
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
            if (model.PatchClientID == null || model.PatchType == null)
            {
                accessor.CreateObject(model);
                return;
            }
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

        protected MethodInfo GetMethod(Type managerType, Type modelType)
        {
            return managerType.GetRuntimeMethod(ACTION_NAME, new Type[] { typeof(CommitTypeEnum), modelType , typeof(int) });
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

        public abstract void Commit(CommitTypeEnum commitType, DMSource model, int id = 0);
        public abstract DMSource Pull(Expression<Func<DMSource, bool>> filter, bool WithDetails = false);
        public abstract List<DMSource> PullAll(bool WithDetails = false);
        public abstract List<DMSource> PullAll(Expression<Func<DMSource, bool>> filter = null, bool WithDetails = false);
        #endregion
    }
}
