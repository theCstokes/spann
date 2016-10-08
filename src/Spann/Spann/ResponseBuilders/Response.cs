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
    public class Response : IHttpActionResult
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Payload { get; set; }
        public Response(HttpStatusCode code, string payload)
        {
            this.StatusCode = code;
            this.Payload = payload;
        }
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