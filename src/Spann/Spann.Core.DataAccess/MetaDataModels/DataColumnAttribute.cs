using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Property)]
    public class DataColumnAttribute :  Attribute, IColumnItem
    {
        public string ColumnName { get; set; }

        public string PropertyName { get; set; }
        public DataColumnAttribute(string columnName)
        {
            this.ColumnName = columnName;
            this.PropertyName = columnName;
        }

        public DataColumnAttribute(string propertyName, string columnName)
        {
            this.ColumnName = columnName;
            this.PropertyName = propertyName;
        }

    }
}
