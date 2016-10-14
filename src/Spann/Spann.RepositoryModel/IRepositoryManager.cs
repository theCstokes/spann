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

        void Add(ModelSource model);

        void Patch(ModelSource model);

        ModelSource Get(Expression<Func<ModelSource, bool>> filter);

        List<ModelSource> GetAll();

        List<ModelSource> GetAll(Expression<Func<ModelSource, bool>> filter);
    }
}
