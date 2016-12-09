using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using Spann.Core.DataAccess.DataBase;
using Spann.Core.DataAccess.QueryBuilders;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Test.Spann.Core.DataAccess.QueryBuilders.Types")]
namespace Spann.Core.DataAccess.QueryBuilders.Types
{
    class LoadQuery : AbstractQueryBuilder
    {
        private const string BASE_QUERY = "SELECT @properties FROM @schemaName.@tableName @whereClause;";
        private List<String> properties;

        public LoadQuery(string schemaName, string tableName) : base(schemaName, tableName, BASE_QUERY)
        {
            properties = new List<string>();
        }

        public LoadQuery AddProperty(string property)
        {
            properties.Add(property);
            return this;
        }

        public override string Build()
        {
            queryBuilder.SetParameter("@properties", QueryBuilderUtils.CreateItemString(properties, QuoteStyle.DOUBLE));
            return queryBuilder.ToString();
        }
    }
}
