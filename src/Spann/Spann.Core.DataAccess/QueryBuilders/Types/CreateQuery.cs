using Spann.Core.DataAccess.QueryBuilders;
using Npgsql;
using Spann.Core.DataAccess.DataBase;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Test.Spann.Core.DataAccess.QueryBuilders.Types")]
namespace Spann.Core.DataAccess.QueryBuilders.Types
{
    internal class CreateQuery : AbstractQueryBuilder
    {
        private const string BASE_QUERY = "INSERT INTO @schemaName.@tableName(@properties) VALUES(@values) RETURNING @schemaName.@tableName.\"ID\"; ";
        private List<String> properties;
        private List<String> values;

        public CreateQuery(string schemaName, string tableName) : base(schemaName, tableName, BASE_QUERY)
        {

            properties = new List<string>();
            values = new List<string>();
        }

        public CreateQuery AddPropertyValue(string property, object value)
        {
            properties.Add(property);
            values.Add(value.ToString());
            return this;
        }

        public override string Build()
        {
            queryBuilder.SetParameter("@properties", QueryBuilderUtils.CreateItemString(properties, QuoteStyle.DOUBLE));
            queryBuilder.SetParameter("@values", QueryBuilderUtils.CreateItemString(values, QuoteStyle.SINGLE));
            return queryBuilder.Build();
        }
    }
}
