using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess
{
    class ConnectionMap
    {
        Dictionary<int, int> connections;
        public ConnectionMap()
        {
            connections = new Dictionary<int, int>();
        }

        public int this[int key]
        {
            get
            {
                return connections[key];
            }
            set
            {
                connections[key] = value;
            }
        }
    }

    public abstract class AbstractDataModel<T> where T : IDataModel, new()
    {

        //public IDictionary<string, JToken> AdditionalData
        //{
        //    get
        //    {
        //        return _additionalData;
        //    }

        //    set
        //    {
        //        _additionalData = value;
        //    }
        //}

        //[JsonIgnore]
        //[JsonExtensionData]
        //private IDictionary<string, JToken> _additionalData;

        [InternalProperty]
        public string PatchType { get; set; }

        [InternalProperty]
        public int? PatchClientID { get; set; }

        [JsonProperty(PropertyName = "identity")]
        public abstract int ID { get; set; }

        private Dictionary<Type, ConnectionMap> createConnections;

        public AbstractDataModel()
        {
            createConnections = new Dictionary<Type, ConnectionMap>();
        }

        public int GetConnectionID(Type t, int connectedItemID)
        {
            return createConnections[t][connectedItemID];
        }

        public void AddConnection(Type t, int connectedItemID, int connectionID)
        {
            ConnectionMap items = null;
            if (createConnections.Count > 0)
            {
                items = createConnections[t];
            }
            
            if(items == null)
            {
                items = new ConnectionMap();
                createConnections[t] = items;
            }
            items[connectedItemID] = connectionID;
        }
    }
}
