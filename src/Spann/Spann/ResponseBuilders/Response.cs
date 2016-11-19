using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Spann.ResponseBuilders
{
    /// <summary>
    /// Property for response
    /// </summary>
    public class Response : IHttpActionResult
    {
        /// <summary>
        /// Property for status code
        /// </summary>
        public HttpStatusCode StatusCode { get; set; }

        /// <summary>
        /// Property for payload
        /// </summary>
        public string Payload { get; set; }

        /// <summary>
        /// Response
        /// </summary>
        /// <param name="code"></param>
        /// <param name="payload"></param>
        public Response(HttpStatusCode code, string payload)
        {
            this.StatusCode = code;
            this.Payload = payload;
        }

        /// <summary>
        /// Execute asynchronously
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage(StatusCode)
            {
                Content = new StringContent(Payload)
            };
            return Task.FromResult(response);
        }
    }
}