using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using Spann.Core.DataAccess.DataBase;
using Spann.Core.DataAccess.QueryBuilders;
using System.Linq.Expressions;

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

        //public void BuildWhere(Expression<Func<TSource, bool>> query)
        //{
        //    BinaryExpression operation = (BinaryExpression)query.Body;
        //    var str = Parse(operation);
        //    return null;
        //}

        //private string Parse(BinaryExpression exp)
        //{
        //    StringBuilder sb = new StringBuilder();

        //    Expression left = exp.Left;
        //    sb.Append(HandleSide(left));
        //    sb.Append(NodeTypeMapper.GetSQLType(exp.NodeType.ToString()));
        //    Expression right = exp.Right;
        //    sb.Append(HandleSide(right));

        //    return sb.ToString();
        //}

        //private string HandleSide(Expression exp)
        //{
        //    if (exp is BinaryExpression)
        //    {
        //        return Parse((BinaryExpression)exp);
        //    }
        //    else if (exp is MemberExpression)
        //    {
        //        return ((MemberExpression)exp).Member.Name;

        //    }
        //    else if (!exp.CanReduce)
        //    {
        //        return exp.ToString();
        //    }
        //    return "";
        //}

        public override string Build()
        {
            queryBuilder.SetParameter("@properties", QueryBuilderUtils.CreateItemString(properties, QuoteStyle.DOUBLE));
            return queryBuilder.ToString();
        }
    }
}
