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
    public abstract class BaseDTO<TDTO, TDM> where TDM : BaseDM<TDM, TDTO>, new() where TDTO : BaseDTO<TDTO, TDM>
    {
        [InternalProperty]
        public string PatchType { get; set; }

        [InternalProperty]
        public int? PatchClientID { get; set; }

        [JsonProperty(PropertyName = "identity")]
        public abstract int ID { get; set; }

        public JObject Details { get; set; }

        [JsonIgnore]
        private Dictionary<string, IList> detailsStore;

        public BaseDTO()
        {
            detailsStore = new Dictionary<string, IList>();
        }

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

        protected void AddDetail(string name)
        {
            detailsStore[name] = null;
        }

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