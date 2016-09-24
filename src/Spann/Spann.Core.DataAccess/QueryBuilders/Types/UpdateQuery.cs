using Spann.Core.DataAccess.QueryBuilders;
using Npgsql;
using Spann.Core.DataAccess.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.QueryBuilders.Types
{
    class UpdateQuery : AbstractQueryBuilder
    {
        private const string BASE_QUERY = "UPDATE @schemaName.@tableName SET @valueMap @whereClause;";
        private Dictionary<string, string> propertyData;

        public UpdateQuery(string schemaName, string tableName) : base(schemaName, tableName, BASE_QUERY)
        {
            propertyData = new Dictionary<string, string>();
        }

        public UpdateQuery AddPropertyValue(string property, object value)
        {
            propertyData.Add(property, value.ToString());
            return this;
        }

        public override string Build()
        {
            queryBuilder.SetParameter("@valueMap", QueryBuilderUtils.CreateMapString(propertyData, QuoteStyle.DOUBLE, QuoteStyle.SINGLE));
            return queryBuilder.ToString();
        }
    }
}
