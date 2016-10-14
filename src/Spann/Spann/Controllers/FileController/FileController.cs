using Newtonsoft.Json.Linq;
using Spann.Core.DomainModel.Python;
using Spann.Core.JsonTools;
using Spann.Core.Requests.Patch;
using Spann.DomainModel.Users;
using Spann.Notifications;
using Spann.PythonTools;
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
    [RoutePrefix("api/v1")]
    public class FileController : ApiController
    {

        [HttpPost]
        [Route("File")]
        public IHttpActionResult CreateFile([FromBody] PythonFileDM file)
        {
            RC.PythonFileManager.Commit(CommitTypeEnum.ADD, file);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, file);
        }

        [HttpPost]
        [Route("Python/Project")]
        public IHttpActionResult CreateProject([FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.ADD, project);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project);
        }

        [HttpPatch]
        [Route("Python/Project")]
        public IHttpActionResult CreateProjectTests([FromBody] PythonProjectDM obj)
        {
            if(PatchTools.IsPatch<PythonProjectDM>(obj))
            {
                RC.PythonProjectManager.Commit(CommitTypeEnum.PATCH, obj);
            } else
            {
                /// TODO - return error
            }
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, obj);
        }

        [HttpPost]
        [Route("Python/Run")]
        public IHttpActionResult RunFile([FromBody] PythonFileDM file)
        {
            List<UserDM> users = RC.UserManager.PullAll();
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
