using Spann.Core.Headers;
using Spann.Core.JsonTools;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace Spann.Controllers
{
    /// <summary>
    /// Reuqest Extensions class    
    /// </summary>
    public static class RequestExtensions
    {
        /// <summary>
        /// Retrieve Header
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Request"></param>
        /// <returns></returns>
        public static T RetrieveHeader<T> (this HttpRequestMessage Request) where T : ICustomHeaderType
        {
            string name = ((HeaderTypeAttribute)typeof(T).GetCustomAttributes(typeof(HeaderTypeAttribute), false).First()).Name;
            var headers = Request.Headers;
            if (headers.Contains(name))
            {
                return (T) JsonUtils.DeserializeObject(headers.GetValues(name).First(), typeof(T));
            }
            return default(T);
        }
    }
}
