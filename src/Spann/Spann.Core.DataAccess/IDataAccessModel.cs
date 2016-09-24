using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess
{
    public interface IDataAccessModel<TSource>
    {
        void CreateObject(TSource dataObject);
        void UpdateObject(TSource dataObject);
        void DeleteObject(int id);
        TSource LoadObject(int id);
        List<TSource> LoadAll();
        List<TSource> LoadAll(Expression<Func<TSource, bool>> query);
    }
}
