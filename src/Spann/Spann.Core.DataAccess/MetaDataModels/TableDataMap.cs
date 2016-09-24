using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    class TableDataMap
    {
        #region Private Fields
        private readonly Dictionary<IColumnItem, PropertyInfo> tableData;
        #endregion

        public TableDataMap(Type t)
        {
            tableData = t.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(DataColumnAttribute)) || Attribute.IsDefined(p, typeof(IDColumnAttribute)))
                .Aggregate(new Dictionary<IColumnItem, PropertyInfo>(), (result, prop) =>
                {
                    if(Attribute.IsDefined(prop, typeof(DataColumnAttribute)))
                    {
                        result.Add((IColumnItem)prop.GetCustomAttribute(typeof(DataColumnAttribute)), prop);
                    }
                    if (Attribute.IsDefined(prop, typeof(IDColumnAttribute)))
                    {
                        result.Add((IColumnItem)prop.GetCustomAttribute(typeof(IDColumnAttribute)), prop);
                    }
                    return result;
                });
        }

        #region Public Members
        /// <summary>
        /// Returns the first FieldInfo object mapped to a key with the ColumnName
        /// equal to the given name;
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public PropertyInfo this[string name]
        {
            get {
                return tableData.First(el => el.Key.ColumnName == name).Value;
            }
            set
            {
                tableData[tableData.First(el => el.Key.ColumnName == name).Key] = value;
            }
        }

        public PropertyInfo LookupByColumnName(string name)
        {
            return tableData.First(el => el.Key.ColumnName == name).Value;
        }

        public PropertyInfo LookupByPropertyName(string name)
        {
            return tableData.First(el => el.Key.PropertyName == name).Value;
        }

        public IEnumerable<KeyValuePair<IColumnItem, PropertyInfo>> Columns
        {
            get
            {
                return tableData.AsEnumerable();
            }
        }

        public IEnumerable<KeyValuePair<DataColumnAttribute, PropertyInfo>> DataColumns
        {
            get
            {
                return tableData.Where(entry => entry.Key is DataColumnAttribute)
                .Select(entry => new KeyValuePair<DataColumnAttribute, PropertyInfo>((DataColumnAttribute)entry.Key, entry.Value))
                .AsEnumerable();
            }
        }
        public IEnumerable<KeyValuePair<IDColumnAttribute, PropertyInfo>> IDColumns
        {
            get
            {
                return tableData.Where(entry => entry.Key is IDColumnAttribute)
                .Select(entry => new KeyValuePair<IDColumnAttribute, PropertyInfo>((IDColumnAttribute)entry.Key, entry.Value))
                .AsEnumerable();
            }
        }

        #endregion
    }
}
