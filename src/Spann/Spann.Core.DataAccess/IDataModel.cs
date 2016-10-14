using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess
{
    /// <summary>
    /// Interface for all Repository Models.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IDataModel
    {
        int ID { get; set; }
        int GetConnectionID(Type t, int connectedItemID);
        void AddConnection(Type t, int connectedItemID, int connectionID);
        //IDictionary<string, JToken> AdditionalData { get; set; }

        string PatchType { get; set; }

        int? PatchClientID { get; set; }
    }
}
