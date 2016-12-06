using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.JsonTools;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.DomainModel.DataTransferObjects
{
    /// <summary>
    /// Base domain transfer object.
    /// </summary>
    /// <typeparam name="TDTO"></typeparam>
    /// <typeparam name="TDM"></typeparam>
    public abstract class BaseDTO<TDTO, TDM> where TDM : BaseDM<TDM, TDTO>, new() where TDTO : BaseDTO<TDTO, TDM>
    {
        /// <summary>
        /// Property for path type.
        /// </summary>
        [InternalProperty]
        public string PatchType { get; set; }

        /// <summary>
        /// Property for patch client id.
        /// </summary>
        [InternalProperty]
        public int? PatchClientID { get; set; }

        /// <summary>
        /// Property for id.
        /// </summary>
        [JsonProperty(PropertyName = "identity")]
        public abstract int ID { get; set; }

        /// <summary>
        /// Property for details.
        /// </summary>
        public JObject Details { get; set; }

        [JsonIgnore]
        private Dictionary<string, IList> detailsStore;

        public BaseDTO()
        {
            detailsStore = new Dictionary<string, IList>();
        }

        /// <summary>
        /// Create a new TDM
        /// </summary>
        /// <returns>TDM</returns>
        public virtual TDM Map()
        {
            TDM dm = new TDM
            {
                ID = ID,
                PatchType = PatchType,
                PatchClientID = PatchClientID
            };
            return dm;
        }

        /// <summary>
        /// Get all details
        /// </summary>
        /// <param name="name">Name of detail</param>
        protected void AddDetail(string name)
        {
            detailsStore[name] = null;
        }

        /// <summary>
        /// Update a detail.
        /// </summary>
        /// <param name="name">Detail name.</param>
        /// <param name="values">Values to update.</param>
        protected void UpdateDetail<T>(string name, List<T> values)
        {
            detailsStore[name] = values;
            if (values.Count > 0)
            {
                if (Details == null)
                {
                    Details = new JObject();
                }
                Details[name] = JsonUtils.ToJToken(values);
            }
        }

        /// <summary>
        /// Get a detail.
        /// </summary>
        /// <param name="name">Name of detail.</param>
        /// <returns>Detail.</returns>
        protected List<T> GetDetail<T>(string name)
        {
            if(!detailsStore.ContainsKey(name) && Details[name] != null)
            {
                detailsStore[name] = Details[name].Select(item => item.ToObject<T>()).ToList();
            }
            return detailsStore[name] as List<T>;
        }
    }
}