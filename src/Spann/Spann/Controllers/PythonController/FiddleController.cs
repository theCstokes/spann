using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.Python;
using Spann.Core.JsonTools;
using Spann.Notifications;
using Spann.PythonTools.Runner;
using Spann.RepositoryModel;
using Spann.ResponseBuilders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Spann.Controllers
{
    [RoutePrefix("api/v1/Python")]
    public class FiddleController : ApiController
    {

        [HttpGet]
        [Route("Fiddle")]
        public HttpResponseMessage RunFiddle()
        {
            HttpContext currentContext = HttpContext.Current;

            if (currentContext.IsWebSocketRequest ||
            currentContext.IsWebSocketRequestUpgrading)
            {
                WebSocketHandler handler = new WebSocketHandler(currentContext);
                handler.OnOpen = uid =>
                {
                    PyProjectManager.Register(uid, (sender, e) => handler.Send(e.Value));
                };
                handler.OnReceive = (uid, msg) =>
                {
                    PythonFileDM file = JsonUtils.DeserializeObject<PythonFileDM>(msg);
                    PyProjectManager.Execute(uid, file);
                };
                handler.OnClose = uid => PyProjectManager.Remove(uid);
            }
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }
    }
}
