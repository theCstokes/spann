using Spann.Core.JsonTools;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Spann.ResponseBuilders
{
    class ResponseUtils
    {
        public static IHttpActionResult CreateResponse<TSource>(HttpStatusCode code, TSource payload)
        {
            dynamic response = new ExpandoObject();
            response.item = payload;
            return new Response(code, JsonUtils.SerializeObject(response));
        }

        public static IHttpActionResult CreateResponse<TSource>(HttpStatusCode code, List<TSource> payload)
        {
            dynamic response = new ExpandoObject();
            response.items = payload;
            return new Response(code, JsonUtils.SerializeObject(response));
        }

        public static IHttpActionResult CreateResponse<TSource>(HttpStatusCode code, TSource payload, Dictionary<string, object> extraProperties)
        {
            dynamic response = GetDynamicObject(extraProperties);
            response.item = payload;
            return new Response(code, JsonUtils.SerializeObject(response));
        }

        public static IHttpActionResult CreateResponse<TSource>(HttpStatusCode code, List<TSource> payload, Dictionary<string, object> extraProperties)
        {
            dynamic response = GetDynamicObject(extraProperties);
            response.items = payload;
            return new Response(code, JsonUtils.SerializeObject(response));
        }

        private static dynamic GetDynamicObject(Dictionary<string, object> properties)
        {
            var dynamicObject = new ExpandoObject() as IDictionary<string, Object>;
            foreach (var property in properties)
            {
                dynamicObject.Add(property.Key, property.Value);
            }
            return dynamicObject;
        }
    }
}
