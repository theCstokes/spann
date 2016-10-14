using Spann.Core.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel
{
    public class DC
    {
        public static DataAccessor<TSource> Accessor<TSource>() where TSource : AbstractDataModel<TSource>, IDataModel, new()
        {
            return new DataAccessor<TSource>();
        }
    }
}
