using Spann.Core.DataAccess.QueryBuilders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using System.Linq.Expressions;

namespace Spann.Core.DataAccess.QueryBuilders
{
    abstract class AbstractQueryBuilder
    {
        public SQLBuilder queryBuilder;

        public AbstractQueryBuilder(string schemaName, string tableName, string baseQuery)
        {
            queryBuilder = new SQLBuilder(baseQuery);
            queryBuilder.SetParameter("@schemaName", schemaName, QuoteStyle.DOUBLE);
            queryBuilder.SetParameter("@tableName", tableName, QuoteStyle.DOUBLE);
        }

        public void AddWhereFragment(int id)
        {
            SQLBuilder whereBuilder = new SQLBuilder("WHERE \"ID\"=@id");
            whereBuilder.SetParameter("@id", Convert.ToString(id));
            queryBuilder.SetParameter("@whereClause", whereBuilder.ToString());
        }

        public void AddWhereFragment(BinaryExpression operation)
        {
            SQLBuilder whereBuilder = new SQLBuilder("WHERE @fragment");
            whereBuilder.SetParameter("@fragment", Parse(operation));
            queryBuilder.SetParameter("@whereClause", whereBuilder.ToString());
        }

        private string Parse(BinaryExpression exp)
        {
            StringBuilder sb = new StringBuilder();

            Expression left = exp.Left;
            sb.Append(HandleSide(left, QuoteStyle.DOUBLE));
            sb.Append(" " + NodeTypeMapper.GetSQLType(exp.NodeType.ToString()) + " ");
            Expression right = exp.Right;
            sb.Append(HandleSide(right, QuoteStyle.SINGLE));

            return sb.ToString();
        }

        private string HandleSide(Expression exp, QuoteStyle style)
        {
            if (exp is BinaryExpression)
            {
                return Parse((BinaryExpression)exp);
            }
            
            try
            {
                return style.Convert(Expression.Lambda(exp).Compile().DynamicInvoke().ToString());
            } catch(InvalidOperationException)
            {
                return style.Convert(((MemberExpression)exp).Member.Name);
            }
        }

        public abstract string Build();
    }
}
