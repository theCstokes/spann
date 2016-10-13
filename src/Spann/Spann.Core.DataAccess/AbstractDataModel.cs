using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess
{
    public abstract class AbstractDataModel<T> where T : IDataModel, new()
    {
        [JsonProperty(PropertyName = "identity")]
        public abstract int ID { get; set; }

        private Dictionary<Type, List<int>> connectionSet;

        public AbstractDataModel()
        {
            connectionSet = new Dictionary<Type, List<int>>();
        }

        public List<int> GetConnection(Type t)
        {
            return connectionSet[t];
        }

        public void AddConnection(Type t, int id)
        {
            List<int> items = null;
            if (connectionSet.Count > 0)
            {
                items = connectionSet[t];
            }
            
            if(items == null)
            {
                items = new List<int>();
                connectionSet[t] = items;
            }
            items.Add(id);
        }
    }
}
