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
    public class DefaultRepositoryManager<DMSource> : BaseRepositoryManager<DefaultRepositoryManager<DMSource>, DMSource>
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
        #region Private Constant(s).
        
        #endregion

        #region Public Field(s).
        
        #endregion

        #region Private Field(s).
        
        #endregion

        #region Public Constructor(s).
        public DefaultRepositoryManager() : base()
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
                    Add(accessor, model);
                    break;
                case CommitTypeEnum.REMOVE:
                    Delete(accessor, model.ID);
                    break;
                case CommitTypeEnum.UPDATE:
                    Update(accessor, id, model);
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
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public override List<DMSource> PullAll(bool WithDetails = false)
        {
            var accessor = DC.Accessor<DMSource>();
            var result = GetAll(accessor, null);
            accessor.Dispose();
            NotifyChangeListeners();
            return result;
        }

        public override List<DMSource> PullAll(Expression<Func<DMSource, bool>> filter, bool WithDetails = false)
        {
            var accessor = DC.Accessor<DMSource>();
            List<DMSource> result = GetAll(accessor, filter);
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
            accessor.CreateObject(model);
        }

        #endregion

        #region Private Function(s).
        #endregion
    }
}
