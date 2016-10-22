using Spann.Core.DataAccess.QueryBuilders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using System.Linq.Expressions;
using System.Reflection;
using Spann.Core.DataAccess.MetaDataModels;

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

        public void AddWhereFragment(BinaryExpression operation, object DataObject = null)
        {
            SQLBuilder whereBuilder = new SQLBuilder("WHERE @fragment");
            whereBuilder.SetParameter("@fragment", Parse(operation, DataObject));
            queryBuilder.SetParameter("@whereClause", whereBuilder.ToString());
        }

        private string Parse(BinaryExpression exp, object obj)
        {
            StringBuilder sb = new StringBuilder();

            Expression left = exp.Left;
            sb.Append(HandleSide(left, QuoteStyle.DOUBLE, obj));
            sb.Append(" " + NodeTypeMapper.GetSQLType(exp.NodeType.ToString()) + " ");
            Expression right = exp.Right;
            sb.Append(HandleSide(right, QuoteStyle.SINGLE, obj));

            return sb.ToString();
        }

        private string HandleSide(Expression exp, QuoteStyle style, object obj)
        {
            if (exp is BinaryExpression)
            {
                return Parse((BinaryExpression)exp, obj);
            }
            
            try
            {
                return style.Convert(Expression.Lambda(exp).Compile().DynamicInvoke().ToString());
            } catch(InvalidOperationException)
            {
                PropertyInfo prop = ((MemberExpression)exp).Member as PropertyInfo;
                if(Attribute.IsDefined(prop, typeof(LookupPropertyAttribute)) &&
                    Attribute.IsDefined(prop, typeof(IDColumnAttribute)) && obj != null)
                {
                    var idData = prop.GetCustomAttribute(typeof(IDColumnAttribute)) as IDColumnAttribute;
                    string propertyName = idData.ColumnName;
                    return style.Convert((string) obj.GetType().GetProperty(propertyName).GetValue(obj));
                }
                return style.Convert(prop.Name);
            }
        }

        public abstract string Build();
    }
}
