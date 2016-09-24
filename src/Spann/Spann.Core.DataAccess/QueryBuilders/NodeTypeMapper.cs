using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.QueryBuilders
{
    public class NodeTypeMapper
    {
        private static readonly Dictionary<int, NodeTypeMapper> Types = new Dictionary<int, NodeTypeMapper>();

        public static readonly NodeTypeMapper AND = new NodeTypeMapper(0, "AND", "And", "AndAlso");
        public static readonly NodeTypeMapper OR = new NodeTypeMapper(1, "OR", "Or", "OrElse");
        public static readonly NodeTypeMapper GREATER_THEN = new NodeTypeMapper(2, ">", "GreaterThan");
        public static readonly NodeTypeMapper EQUAL = new NodeTypeMapper(3, "=", "Equal");

        public string SQLType { get; private set; }
        public string[] Keys { get; private set; }
        private readonly int underlyingValue;
        private NodeTypeMapper(int underlyingValue, string sqlType, params string[] keys)
        {
            this.underlyingValue = underlyingValue;
            Types[underlyingValue] = this;
            this.SQLType = sqlType;
            this.Keys = keys;
        }

        public static implicit operator int(NodeTypeMapper type)
        {
            return type.underlyingValue;
        }

        public static implicit operator NodeTypeMapper(int value)
        {
            return Types[value];
        }

        public static string GetSQLType(string key)
        {
            return Types.Values.First(type => type.Keys.Contains(key)).SQLType;
        }


    }
}
