﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
                    NullValueHandling = NullValueHandling.Ignore
                });
        }

        public static JToken ToJToken(object obj)
        {
            JsonSerializer js = new JsonSerializer();
            js.NullValueHandling = NullValueHandling.Ignore;
            js.ContractResolver = new ObjectPropertyResolver();
            return JToken.FromObject(obj, js);
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
