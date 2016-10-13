using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ConnectionAttribute :  Attribute
    {
        public Type DataType { get; set; }
        public string SchemaName { get; set; }
        public string TableName { get; set; }
        
        public ConnectionAttribute(Type t, string schemaName, string tableName)
        {
            this.DataType = t;
            this.SchemaName = schemaName;
            this.TableName = tableName;
        }
    }
}
