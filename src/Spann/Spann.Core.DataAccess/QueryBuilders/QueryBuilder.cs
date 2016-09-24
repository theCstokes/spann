using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DataAccess.QueryBuilders.Types;

namespace Spann.Core.DataAccess.QueryBuilders
{
    class QueryBuilder
    {
        public static CreateQuery Create(TableItemAttribute model)
        {
            return new CreateQuery(model.SchemaName, model.TableName);
        }

        public static UpdateQuery Update(TableItemAttribute model)
        {
            return new UpdateQuery(model.SchemaName, model.TableName);
        }

        public static DeleteQuery Delete(TableItemAttribute model)
        {
            return new DeleteQuery(model.SchemaName, model.TableName);
        }

        public static LoadQuery Load(TableItemAttribute model)
        {
            return new LoadQuery(model.SchemaName, model.TableName);
        }
    }
}
