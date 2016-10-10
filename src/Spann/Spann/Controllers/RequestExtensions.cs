using Spann.Core.Headers;
using Spann.Core.JsonTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace Spann.Controllers
{
    public static class RequestExtensions
    {
        public static T RetrieveHeader<T> (this HttpRequestMessage Request) where T : ICustomHeaderType
        {
            string name = ((HeaderType)typeof(T).GetCustomAttributes(typeof(HeaderType), false).First()).Name;
            var headers = Request.Headers;
            if (headers.Contains(name))
            {
                return (T) JsonUtils.DeserializeObject(headers.GetValues(name).First(), typeof(T));
            }
            return default(T);
        }
    }
}
