using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.Python;
using Spann.Notifications;
using Spann.PythonTools;
using Spann.PythonTools.Console;
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
    /// <summary>
    /// API Controller for console
    /// </summary>
    [RoutePrefix("api/v1/Python")]
    public class ConsoleController : ApiController
    {
        /// <summary>
        /// Start up a new console.
        /// </summary>
        /// <returns>Status code.</returns>
        [HttpGet]
        [Route("Console")]
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
                handler.OnClose = uid =>
                {
                    PyConsoleManager.Remove(uid);
                    // force kill prcoess in Python Tools PyProject
                };
            }
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }
    }
}
