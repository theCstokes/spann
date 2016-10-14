using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann
{
    public class PatchDTO
    {
        public string PatchType { get; set; }

        public IDictionary<string, JToken> AdditionalData
        {
            get
            {
                return _additionalData;
            }

            set
            {
                _additionalData = value;
            }
        }

        [JsonExtensionData]
        private IDictionary<string, JToken> _additionalData;

    }
}