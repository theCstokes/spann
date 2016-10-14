using Newtonsoft.Json;
using System;
using System.Linq;
using System.Reflection;

namespace Spann.Core.JsonTools.JsonToObject
{
    class PropertyNameConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            return objectType.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(JsonPropertyAttribute)))
                .Count() > 0;
        }

        public override bool CanRead
        {
            get
            {
                return true;
            }
        }

        public override bool CanWrite
        {
            get
            {
                return false;
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JsonSerializer s = new JsonSerializer();
            object dataObject = s.Deserialize(reader, objectType);
            objectType.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(JsonPropertyAttribute), true))
                .ToList().ForEach(p =>
                {
                    string value = (string) p.GetValue(dataObject);
                    var firstChar = value.Substring(0, 1);
                    string result = firstChar.ToUpper() + value.Substring(1);
                    p.SetValue(dataObject, result);
                });
            return dataObject;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
