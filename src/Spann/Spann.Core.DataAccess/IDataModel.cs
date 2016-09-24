using Newtonsoft.Json;
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
    public abstract class IDataModel<T> where T : new()
    {
        [JsonProperty(PropertyName = "identity")]
        public abstract int ID { get; set; }
    }
}
