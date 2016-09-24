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

namespace Spann.Core.DataAccess
{
    public class DataAccessor<DMSource> : IDataAccessModel<DMSource> where DMSource : IDataModel<DMSource>, new()
    {
        private readonly TableItemAttribute TABLE;
        private readonly DataColumnAttribute[] COLUMNS;

        private readonly TableDataMap DATA_MAP;
        private DB db;

        public DataAccessor()
        {
            TABLE = GetItem<TableItemAttribute>(typeof(DMSource));
            COLUMNS = GetAllItems<DataColumnAttribute>(typeof(DMSource));
            DATA_MAP = new TableDataMap(typeof(DMSource));
            db = new DB();
        }

        public void CreateObject(DMSource DataObject)
        {
            CreateQuery query = new CreateQuery(TABLE.SchemaName, TABLE.TableName);

            foreach (var entry in DATA_MAP.DataColumns)
            {
                query.AddPropertyValue(entry.Key.ColumnName, entry.Value.GetValue(DataObject));
            }

            using (var cmd = db.GetCommand(query.Build()))
            {
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        DataObject.ID = Convert.ToInt32(reader.GetString(0));
                        return;
                    }
                }
            }
            db.Dispose();
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
                    query.AddPropertyValue(entry.Key.ColumnName, value);
                }
            }
      
            using (var cmd = db.GetCommand(query.Build()))
            {
                cmd.ExecuteNonQuery();
            }
            db.Dispose();
        }

        public void DeleteObject(int id)
        {
            DeleteQuery query = QueryBuilder.Delete(TABLE);
            ((DeleteQuery)query).AddWhereFragment(id);

            using(var cmd = db.GetCommand(query.Build()))
            {
                cmd.ExecuteNonQuery();
            }
            db.Dispose();
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
            using (var cmd = db.GetCommand(query.Build()))
            {
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
            }
            db.Dispose();
            return item;
        }

        public List<DMSource> LoadAll()
        {
            
            LoadQuery query = QueryBuilder.Load(TABLE);

            foreach (var entry in DATA_MAP.Columns)
            {
                query.AddProperty(entry.Key.ColumnName);
            }

            List<DMSource> items = new List<DMSource>();
            using (var cmd = db.GetCommand(query.Build()))
            {
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        DMSource item = CreateNewItem();
                        for (var i = 0; i < DATA_MAP.Columns.Count(); i++)
                        {
                            SetItem(reader.GetName(i), reader.GetString(i), DATA_MAP, item);
                        }
                        items.Add(item);
                    }
                }
            }
            db.Dispose();
            return items;
        }

        public List<DMSource> LoadAll(Expression<Func<DMSource, bool>> exp)
        {
            
            BinaryExpression operation = (BinaryExpression)exp.Body;

            LoadQuery query = QueryBuilder.Load(TABLE);

            foreach (var entry in DATA_MAP.Columns)
            {
                query.AddProperty(entry.Key.ColumnName);
            }
            query.AddWhereFragment(operation);

            List<DMSource> items = new List<DMSource>();
            using (var cmd = db.GetCommand(query.Build()))
            {
                using (var reader = cmd.ExecuteReader()) {
                    while (reader.Read())
                    {
                        DMSource item = CreateNewItem();
                        for (var i = 0; i < DATA_MAP.Columns.Count(); i++)
                        {
                            SetItem(reader.GetName(i), reader.GetString(i), DATA_MAP, item);
                        }
                        items.Add(item);
                    }
                }
            }
            db.Dispose();
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
    }
}
