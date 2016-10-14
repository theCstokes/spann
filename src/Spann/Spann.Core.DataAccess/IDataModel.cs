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

        List<int> GetConnection(Type t);
        void AddConnection(Type t, int id);
        IDictionary<string, JToken> AdditionalData { get; set; }
    }
}
