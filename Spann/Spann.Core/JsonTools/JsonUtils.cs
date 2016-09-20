using Newtonsoft.Json;
using Spann.Core.JsonTools.JsonToObject;
using Spann.Core.JsonTools.ObjectToJson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.JsonTools
{
    public class JsonUtils
    {
        public static string SerializeObject(object obj)
        {
            return JsonConvert.SerializeObject(obj,
                new JsonSerializerSettings
                {
                    ContractResolver = new ObjectPropertyNameResolver()
                });
        }

        public static dynamic DeserializeObject(string json, Type type)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(new PropertyReferenceConverter());
            return JsonConvert.DeserializeObject(json, type, settings);
        }
    }
}
