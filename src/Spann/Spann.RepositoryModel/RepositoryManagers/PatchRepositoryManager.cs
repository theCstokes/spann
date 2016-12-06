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
    public class PatchRepositoryManager<DMSource> : BaseRepositoryManager<PatchRepositoryManager<DMSource>, DMSource>
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
        #region Private Constant(s).
        #endregion

        #region Public Field(s).
        #endregion

        #region Private Field(s).
        #endregion

        #region Public Constructor(s).
        public PatchRepositoryManager() : base()
        {
        }
        #endregion

        #region Public Function(s).

        public override void Commit(CommitTypeEnum commitType, DMSource model, int id = 0)
        {
            var accessor = DC.Accessor<DMSource>();
            switch (commitType)
            {
                case CommitTypeEnum.ADD:
                    RunChildAdd(accessor, model);
                    break;
                case CommitTypeEnum.REMOVE:
                    Delete(accessor, model.ID);
                    break;
                case CommitTypeEnum.UPDATE:
                    Update(accessor, id, model);
                    break;
                case CommitTypeEnum.PATCH:
                    RunChildPatch(accessor, model);
                    break;
                default:
                    break;
            }
            accessor.Dispose();
            NotifyChangeListeners();
        }

        public override DMSource Pull(Expression<Func<DMSource, bool>> filter, bool WithDetails = false)
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

        public override List<DMSource> PullAll(bool WithDetails = false)
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

        public override List<DMSource> PullAll(Expression<Func<DMSource, bool>> filter, bool WithDetails = false)
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

        #endregion

        #region Private Function(s).
        private void RunChildAdd(DataAccessor<DMSource> accessor, DMSource model)
        {

            accessor.CreateObject(model);

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

        private void RunChildPatch(DataAccessor<DMSource> accessor, DMSource model)
        {
            if (model.PatchClientID != null || model.PatchType != null)
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

        private void ExicuteNextChain(PatchTypeEnum type, DataAccessor<DMSource> accessor, Type connectionType,
            DMSource model, IDataModel connectionModel)
        {
            switch (type.EnumValue)
            {
                case PatchTypeEnum.Enum.Create:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.ADD, connectionModel, 0 });
                        accessor.CreateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
                        break;
                    }
                case PatchTypeEnum.Enum.Update:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.UPDATE, connectionModel, connectionModel.ID });
                        accessor.UpdateConnection(model, accessor.DATA_MAP.Connection(connectionType), connectionModel.ID);
                        break;
                    }
                case PatchTypeEnum.Enum.Delete:
                    {
                        Type managerType = RC.GetManagerType(connectionType);
                        var method = GetMethod(managerType, connectionType);
                        method.Invoke(RC.GetManager(connectionType), new object[] { CommitTypeEnum.REMOVE, connectionModel, connectionModel.ID });
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
                    IList items = accessor.DATA_MAP.Connection(connectionType).Property.GetValue(result) as IList;
                    foreach (var child in children)
                    {
                        int index = items.FirstIndex<IDataModel>((value) => value.ID == (child as IDataModel).ID);
                        if (index != -1)
                        {
                            items.RemoveAt(index);
                        }
                        items.Add(child);
                    }
                });
            });
        }

        
        #endregion
    }
}

