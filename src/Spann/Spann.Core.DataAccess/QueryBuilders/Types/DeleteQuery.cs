using Spann.Core.DataAccess.QueryBuilders;
using Npgsql;
using Spann.Core.DataAccess.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Test.Spann.Core.DataAccess.QueryBuilders.Types")]
namespace Spann.Core.DataAccess.QueryBuilders.Types
{
    class DeleteQuery : AbstractQueryBuilder
    {
        private const string BASE_QUERY = "DELETE FROM @schemaName.@tableName @whereClause;";

        public DeleteQuery(string schemaName, string tableName) : base(schemaName, tableName, BASE_QUERY)
        {
        }

        public override string Build()
        {
            return queryBuilder.ToString();
        }
    }
}
