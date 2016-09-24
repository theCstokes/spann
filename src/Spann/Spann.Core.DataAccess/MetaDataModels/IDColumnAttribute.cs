using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Property)]
    public class IDColumnAttribute : Attribute, IColumnItem
    {
        private const string COLUMN_NAME = "ID";
        private const string PROPERTY_NAME = "ID";
        public string ColumnName { get; set; }

        public string PropertyName { get; set; }

        public IDColumnAttribute()
        {
            this.ColumnName = COLUMN_NAME;
            this.PropertyName = PROPERTY_NAME;
        }
        public IDColumnAttribute(string columnName, string propertyName)
        {
            this.ColumnName = columnName;
            this.PropertyName = propertyName;
        }
        public IDColumnAttribute(string propertyName)
        {
            this.ColumnName = COLUMN_NAME;
            this.PropertyName = propertyName;
        }

    }
}
