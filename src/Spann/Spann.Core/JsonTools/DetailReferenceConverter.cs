using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.JsonTools.JsonToObject
{
    class DetailReferenceConverter : JsonConverter
    {

        public override bool CanConvert(Type objectType)
        {
            return objectType.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(DetailAttribute)))
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
                return true;
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JsonSerializer s = new JsonSerializer();
            object dataObject = s.Deserialize(reader, objectType);
            objectType.GetRuntimeProperties()
                .Where(p => Attribute.IsDefined(p, typeof(DetailAttribute), true))
                .ToList().ForEach(p =>
                {
                    //PropertyReference reference =  (PropertyReference) p.GetCustomAttribute(typeof(PropertyReference));
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
