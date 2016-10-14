using Spann.Core.DataAccess;
using Spann.Core.DomainModel;
using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Spann.RepositoryModel
{
    interface IRepositoryManager<TSource, ModelSource> where TSource : new()
        where ModelSource : AbstractDataModel<ModelSource>, IDataModel, new()
    {

        void Commit(CommitTypeEnum commitType, ModelSource model);

        ModelSource Pull(Expression<Func<ModelSource, bool>> filter);

        List<ModelSource> PullAll();

        List<ModelSource> PullAll(Expression<Func<ModelSource, bool>> filter);
    }
}
