using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Spann.Core.JsonTools.JsonToObject;
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
                    ContractResolver = new ObjectPropertyResolver(),
<<<<<<< HEAD
                    NullValueHandling = NullValueHandling.Ignore
=======
>>>>>>> 9184c4db068f18eff5cc097a04ab500fb58a519e
                });
        }

        public static dynamic DeserializeObject(string json, Type type)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(new PropertyReferenceConverter());
            return JsonConvert.DeserializeObject(json, type, settings);
        }

        public static T DeserializeObject<T>(string json) where T : class
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(new PropertyReferenceConverter());
            return JsonConvert.DeserializeObject(json, typeof(T), settings) as T;
        }
    }
}
