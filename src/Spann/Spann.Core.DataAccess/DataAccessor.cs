using Spann.Core.DataAccess.QueryBuilders;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DataAccess.QueryBuilders.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Spann.Core.DataAccess.DataBase;
using Npgsql;
using Spann.Core.DataAccess.BaseDomainModel;
using System.Reflection;

namespace Spann.Core.DataAccess
{
    public class DataAccessor<DMSource> : IDataAccessModel<DMSource> where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
    {
        private readonly TableItemAttribute TABLE;
        private readonly DataColumnAttribute[] COLUMNS;

        public readonly TableDataMap DATA_MAP;
        private DB db;

        public DataAccessor()
        {
            TABLE = GetItem<TableItemAttribute>(typeof(DMSource));
            COLUMNS = GetAllItems<DataColumnAttribute>(typeof(DMSource));
            DATA_MAP = new TableDataMap(typeof(DMSource));
            db = new DB();
            db.Connect();
        }

        public void Dispose()
        {
            db.Dispose();
        }

        public void CreateObject(DMSource DataObject)
        {
            CreateQuery query = new CreateQuery(TABLE.SchemaName, TABLE.TableName);

            foreach (var entry in DATA_MAP.DataColumns)
            {
                query.AddPropertyValue(entry.Key.ColumnName, entry.Value.GetValue(DataObject));
            }

            var cmd = db.GetCommand(query.Build());
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        DataObject.ID = Convert.ToInt32(reader.GetString(0));
                        return;
                    }
                }
        }

        public void CreateConnection(DMSource DataObject, ConnectionDataMap connection, int id)
        {
            CreateQuery query = new CreateQuery(connection.SchemaName, connection.TableName);

            query.AddPropertyValue(connection.ParentID, DataObject.ID);
            query.AddPropertyValue(connection.ChildID, id);

            var cmd = db.GetCommand(query.Build());
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    DataObject.AddConnection(connection.DataType, id, Convert.ToInt32(reader.GetString(0)));
                    return;
                }
            }
        }

        public void UpdateObject(DMSource DataObject)
        {
            UpdateQuery query = QueryBuilder.Update(TABLE);
            ((UpdateQuery)query).AddWhereFragment(DataObject.ID);

            foreach (var entry in DATA_MAP.DataColumns)
            {
                var value = entry.Value.GetValue(DataObject);
                if (value != null)
                {
                    query.AddPropertyValue(entry.Key.ColumnName, @value.ToString().Replace("'", "''''"));
                }
            }

            var cmd = db.GetCommand(query.Build());
            cmd.ExecuteNonQuery();
        }

        public void UpdateConnection(DMSource DataObject, ConnectionDataMap connection, int id)
        {
            CreateQuery query = new CreateQuery(connection.SchemaName, connection.TableName);

            query.AddPropertyValue(connection.ParentID, DataObject.ID);
            query.AddPropertyValue(connection.ChildID, id);

            var cmd = db.GetCommand(query.Build());
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    DataObject.AddConnection(connection.DataType, id, Convert.ToInt32(reader.GetString(0)));
                    return;
                }
            }
        }

        public void DeleteObject(int id)
        {
            DeleteQuery query = QueryBuilder.Delete(TABLE);
            ((DeleteQuery)query).AddWhereFragment(id);

            var cmd = db.GetCommand(query.Build());
                cmd.ExecuteNonQuery();
        }

        public void DeleteConnection(int id)
        {
            DeleteQuery query = QueryBuilder.Delete(TABLE);
            ((DeleteQuery)query).AddWhereFragment(id);

            var cmd = db.GetCommand(query.Build());
            cmd.ExecuteNonQuery();
        }

        public DMSource LoadObject(int targetId)
        {
            
            LoadQuery query = QueryBuilder.Load(GetItem<TableItemAttribute>(typeof(DMSource)));
            ((LoadQuery)query).AddWhereFragment(targetId);
            var targetMap = new TableDataMap(typeof(DMSource));

            foreach (var entry in targetMap.DataColumns)
            {
                query.AddProperty(entry.Key.ColumnName);
            }

            DMSource item = CreateNewItem();
            var cmd = db.GetCommand(query.Build());
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        for (var i = 0; i < targetMap.DataColumns.Count(); i++)
                        {
                            SetItem(reader.GetName(i), reader.GetString(i), targetMap, item);
                        }
                    }
                }
            return item;
        }

        public List<ConnectionDM> LoadConnections(Expression<Func<ConnectionDM, bool>> exp, DMSource model, ConnectionDataMap connection)
        {
            LoadQuery query = new LoadQuery(connection.SchemaName, connection.TableName);

            BinaryExpression operation = (BinaryExpression)exp.Body;
            query.AddWhereFragment(operation, DataObject: connection);

            //query.AddProperty("ID");
            //query.AddProperty(connection.ParentID);
            //query.AddProperty(connection.ChildID);
            var targetMap = new TableDataMap(typeof(ConnectionDM));
            Dictionary<string, string> currentPropertyMap = new Dictionary<string, string>();

            foreach (var entry in targetMap.IDColumns)
            {
                var prop = entry.Value;
                if (Attribute.IsDefined(prop, typeof(LookupPropertyAttribute))) {
                    var idData = entry.Value.GetCustomAttribute(typeof(IDColumnAttribute)) as IDColumnAttribute;
                    var propertyName = idData.ColumnName;
                    var value = (string) connection.GetType().GetProperty(propertyName).GetValue(connection);
                    query.AddProperty(value);
                    currentPropertyMap[value] = propertyName;
                } else
                {
                    query.AddProperty(entry.Key.ColumnName);
                }
            }

            

            List<ConnectionDM> items = new List<ConnectionDM>();
            var cmd = db.GetCommand(query.Build());
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    ConnectionDM item = CreateNewItem<ConnectionDM>();
                    for (var i = 0; i < DATA_MAP.Columns.Count(); i++)
                    {
                        var itemName = reader.GetName(i);
                        if (currentPropertyMap.ContainsKey(itemName))
                        {
                            itemName = currentPropertyMap[itemName];
                        }
                        SetItem(itemName, reader.GetString(i), targetMap, item);
                    }
                    items.Add(item);
                }
            }
            return items;
        }

        //public List<DMSource> LoadAll()
        //{

        //    LoadQuery query = QueryBuilder.Load(TABLE);

        //    foreach (var entry in DATA_MAP.Columns)
        //    {
        //        query.AddProperty(entry.Key.ColumnName);
        //    }

        //    List<DMSource> items = new List<DMSource>();
        //    var cmd = db.GetCommand(query.Build());
        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())
        //            {
        //                DMSource item = CreateNewItem();
        //                for (var i = 0; i < DATA_MAP.Columns.Count(); i++)
        //                {
        //                    SetItem(reader.GetName(i), reader.GetString(i), DATA_MAP, item);
        //                }
        //                items.Add(item);
        //            }
        //        }
        //    return items;
        //}

        public List<DMSource> LoadAll(Expression<Func<DMSource, bool>> exp = null)
        {
            LoadQuery query = QueryBuilder.Load(TABLE);

            foreach (var entry in DATA_MAP.Columns)
            {
                query.AddProperty(entry.Key.ColumnName);
            }

            if(exp != null)
            {
                BinaryExpression operation = (BinaryExpression)exp.Body;
                query.AddWhereFragment(operation);
            }

            List<DMSource> items = new List<DMSource>();
            var cmd = db.GetCommand(query.Build());
                using (var reader = cmd.ExecuteReader()) {
                while (reader.Read())
                {
                    DMSource item = CreateNewItem();
                    for (var i = 0; i < DATA_MAP.Columns.Count(); i++)
                    {
                        if (!reader.IsDBNull(i))
                        {
                            SetItem(reader.GetName(i), reader.GetString(i), DATA_MAP, item);
                        }
                    }
                    items.Add(item);
                }
            }
            return items;
        }

        private static Q GetItem<Q>(Type t) where Q : Attribute
        {
            return (Q)Attribute.GetCustomAttribute(t, typeof(Q));
        }

        private static Q[] GetAllItems<Q>(Type t) where Q : Attribute
        {
            return (Q[])Attribute.GetCustomAttributes(t, typeof(Q));
        }

        private static void GetAllConnections(Type t)
        {
            var att = Attribute.GetCustomAttributes(t, typeof(ConnectionAttribute));
        }

        private void SetItem(string name, string value)
        {
            DATA_MAP[name].SetValue(this, value);
        }

        private void SetItem(string name, string value, object target)
        {
            DATA_MAP[name].SetValue(target, value);
        }

        private static void SetItem(string name, string value, TableDataMap targetMap, object target)
        {
            if (targetMap[name].PropertyType == typeof(int))
            {
                targetMap[name].SetValue(target, Convert.ToInt32(value));
            }
            else if (targetMap[name].PropertyType == typeof(string))
            {
                targetMap[name].SetValue(target, value);
            }
        }

        private static DMSource CreateNewItem()
        {
            return Activator.CreateInstance<DMSource>();
        }

        private static T CreateNewItem<T>()
        {
            return Activator.CreateInstance<T>();
        }
    }
}
