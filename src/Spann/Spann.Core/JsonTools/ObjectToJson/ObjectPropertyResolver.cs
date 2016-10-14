using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.JsonTools.JsonToObject
{
    class ObjectPropertyResolver : DefaultContractResolver
    {
        public static readonly ObjectPropertyResolver Instance = new ObjectPropertyResolver();

        public ObjectPropertyResolver() : base()
        {
            NamingStrategy = new CamelCaseNamingStrategy
            {
                ProcessDictionaryKeys = true,
                OverrideSpecifiedNames = true
            };
        }
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {

            var property = base.CreateProperty(member, memberSerialization);
            property.ShouldSerialize = instance =>
            {
                return !Attribute.IsDefined(member, typeof(InternalPropertyAttribute), true);
            };
            return property;
        }
    }
}
