using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    public class ConnectionDataMap
    {
        public string SchemaName { get; private set; }
        public string TableName { get; private set; }
        public Type DataType { get; private set; }
        [LookupProperty]
        public string ParentID { get; private set; }
        [LookupProperty]
        public string ChildID { get; private set; }

        public PropertyInfo Property { get; private set; }

        public ConnectionDataMap(ConnectionAttribute connection, MapAttribute map, PropertyInfo prop)
        {
            this.SchemaName = connection.SchemaName;
            this.TableName = connection.TableName;
            this.DataType = connection.DataType;
            this.ParentID = map.CurrentID;
            this.ChildID = map.ConnectionID;
            this.Property = prop;
        }
    }
    public class TableDataMap
    {
        #region Private Fields
        private readonly Dictionary<IColumnItem, PropertyInfo> tableData;

        private readonly Dictionary<Type, ConnectionDataMap> connectionData;
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

            var connections = t.GetCustomAttributes(typeof(ConnectionAttribute))
               .Aggregate(new Dictionary<Type, ConnectionAttribute>(), (result, item) =>
               {
                   var connection = item as ConnectionAttribute;
                   result[connection.DataType] = connection;
                   return result;
               });

            connectionData = t.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(MapAttribute)))
                .Aggregate(new Dictionary<Type, ConnectionDataMap>(), (result, prop) =>
                {
                    var map = prop.GetCustomAttribute(typeof(MapAttribute)) as MapAttribute;
                    result[map.DataType] = new ConnectionDataMap(connections[map.DataType], map, prop);
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

        public bool HasConnections
        {
            get
            {
                return connectionData.Count > 0;
            }
        }

        public List<IDataModel> ConnectionValue(Type t, Object obj)
        {
            IList data = connectionData[t].Property.GetValue(obj) as IList; // Get the value from prop
            List<IDataModel> list = new List<IDataModel>();
            foreach (var item in data)
            {
                list.Add(item as IDataModel);
            }
            return list;
        }

        public ConnectionDataMap Connection(Type t)
        {
            return connectionData[t];
        }

        public List<ConnectionDataMap> Connections
        {
            get
            {
                return connectionData.Values.ToList();
            }
        }

        public List<Type> ConnectionTypes
        {
            get
            {
                return connectionData.Keys.ToList();
            }
        }

        #endregion
    }
}
