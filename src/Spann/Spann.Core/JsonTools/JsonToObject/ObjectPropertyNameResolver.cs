using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.JsonTools.JsonToObject
{
    class ObjectPropertyNameResolver : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            
            string propertyName = member.Name;
            if(Attribute.IsDefined(member, typeof(JsonPropertyAttribute), true))
            {
                propertyName = (member.GetCustomAttribute(typeof(JsonPropertyAttribute)) as JsonPropertyAttribute).PropertyName;
            } else
            {
                string targetName = member.Name;
                if (Attribute.IsDefined(member, typeof(DataColumnAttribute), true))
                {
                    targetName = (member.GetCustomAttribute(typeof(DataColumnAttribute)) as IColumnItem).PropertyName;
                }
                else if (Attribute.IsDefined(member, typeof(DataColumnAttribute), true))
                {
                    targetName = (member.GetCustomAttribute(typeof(DataColumnAttribute)) as IColumnItem).PropertyName;
                }
                var firstChar = targetName.Substring(0, 1);
                propertyName = firstChar.ToLower() + targetName.Substring(1);
            }

            var property = base.CreateProperty(member, memberSerialization);
            property.PropertyName = propertyName;
            return property;
        }
    }
}
