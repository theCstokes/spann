using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.DataTransferObjects.Python;
using Spann.Core.DomainModel.Python;
using Spann.RepositoryModel;
using Spann.RepositoryModel.RepositoryManagers;
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
    /// API Controller for projects.
    /// </summary>
    [RoutePrefix("api/v1/Python")]
    public class ProjectController : ApiController
    {
        #region GET
        /// <summary>
        /// Get a project.
        /// </summary>
        /// <param name="id">Project id.</param>
        /// <returns>Status code and project map.</returns>
        [HttpGet]
        [Route("Project/{id:int}")]
        public IHttpActionResult GetProject([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }

        /// <summary>
        /// Get a project's details.
        /// </summary>
        /// <param name="id">Project id.</param>
        /// <returns>Status code and project map.</returns>
        [HttpGet]
        [Route("Project/{id:int}/Details")]
        public IHttpActionResult GetProjectDetails([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id, WithDetails: true);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }

        /// <summary>
        /// Get all projects.
        /// </summary>
        /// <returns>Status code and all project maps</returns>
        [HttpGet]
        [Route("Project")]
        public IHttpActionResult GetAllProjects()
        {
            List<PythonProjectDM> projects = RC.PythonProjectManager.PullAll();
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, projects.Select(item => item.Map()));
        }

        /// <summary>
        /// Get all project details..
        /// </summary>
        /// <returns>Status cdoe and all project maps.</returns>
        [HttpGet]
        [Route("Project/Details")]
        public IHttpActionResult GetAllProjectsDetails()
        {
            List<PythonProjectDM> projects = RC.PythonProjectManager.PullAll(WithDetails: true);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, projects.Select(item => item.Map()));
        }
        #endregion

        #region POST
        /// <summary>
        /// Create a new project
        /// </summary>
        /// <param name="project">Project object.</param>
        /// <returns>Status code and project map.</returns>
        [HttpPost]
        [Route("Project")]
        public IHttpActionResult CreateProject([FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.ADD, project);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion

        #region PUT
        /// <summary>
        /// Update a project.
        /// </summary>
        /// <param name="id">Project id.</param>
        /// <param name="project">Project object</param>
        /// <returns>Status code and project map.</returns>
        [HttpPut]
        [Route("Project/{id:int}")]
        public IHttpActionResult UpdateProject([FromUri] int id, [FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.UPDATE, project, id:id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion

        #region PATCH
        /// <summary>
        /// Test DTO
        /// </summary>
        /// <param name="obj">Project DTO object.</param>
        /// <returns>Status code and project map.</returns>
        [HttpPatch]
        [Route("Project")]
        public IHttpActionResult TestDTO([FromBody] PythonProjectDTO obj)
        {
            PythonProjectDM project = obj.Map();
            //if (PatchTools.IsPatch(project))
            //{
            //    RC.PythonProjectManager.Commit(CommitTypeEnum.PATCH, project);
            //}
            //else
            //{
            //    /// TODO - return error
            //}
            RC.PythonProjectManager.Commit(CommitTypeEnum.PATCH, project);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion
    }
}
