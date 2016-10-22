using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.Python;
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
    public class ProjectController : ApiController
    {

        [HttpPost]
        [Route("Project")]
        public IHttpActionResult CreateProject([FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.ADD, project);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project);
        }

        [HttpPatch]
        [Route("Project")]
        public IHttpActionResult CreateProjectTests([FromBody] PythonProjectDM obj)
        {
            if(PatchTools.IsPatch(obj))
            {
                RC.PythonProjectManager.Commit(CommitTypeEnum.PATCH, obj);
            } else
            {
                /// TODO - return error
            }
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, obj);
        }

        [HttpGet]
        [Route("Project/{id:int}")]
        public IHttpActionResult GetProject([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project);
        }

        [HttpGet]
        [Route("Project/{id:int}/Details")]
        public IHttpActionResult GetProjectDetails([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id, WithDetails: true);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project);
        }
    }
}
