using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Class)]
    public class TableItemAttribute : Attribute
    {
        public string TableName { get; private set; }
        public string SchemaName { get; private set; }
        public TableItemAttribute(string schemaName, string tableName)
        {
            this.SchemaName = schemaName;
            this.TableName = tableName;
        }
    }
}
