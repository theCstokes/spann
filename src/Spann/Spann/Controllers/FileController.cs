using Spann.Core.DomainModel.Python;
using Spann.Core.JsonTools;
using Spann.DomainModel.Users;
using Spann.Notifications;
using Spann.PythonTools;
using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Spann.Controllers
{
    [RoutePrefix("api/v1")]
    public class FileController : ApiController
    {
        [HttpPost]
        [Route("Python/Run")]
        public IHttpActionResult RunFile([FromBody] PythonFileDM file)
        {
            List<UserDM> users = RC.UserManager.GetAll();
            return Ok(JsonUtils.SerializeObject(users));
        }

        [HttpGet]
        [Route("Python/Console")]
        public HttpResponseMessage StartConsole()
        {
            HttpContext currentContext = HttpContext.Current;

            if (currentContext.IsWebSocketRequest ||
            currentContext.IsWebSocketRequestUpgrading)
            {
                WebSocketHandler handler = new WebSocketHandler(currentContext);
                handler.OnOpen = uid =>
                {
                    PyConsoleManager.Register(uid, (sender, e) => handler.Send(e.Value));
                };
                handler.OnReceive = (uid, msg) =>
                {
                    PyConsoleManager.Execute(uid, msg);
                };
                handler.OnClose = uid => PyConsoleManager.Remove(uid);
            }
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }
    }
}
