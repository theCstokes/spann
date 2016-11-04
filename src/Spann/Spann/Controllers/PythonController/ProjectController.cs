﻿using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.DataTransferObjects.Python;
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

        #region GET
        [HttpGet]
        [Route("Project/{id:int}")]
        public IHttpActionResult GetProject([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }

        [HttpGet]
        [Route("Project/{id:int}/Details")]
        public IHttpActionResult GetProjectDetails([FromUri] int id)
        {
            var project = RC.PythonProjectManager.Pull(p => p.ID == id, WithDetails: true);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }

        [HttpGet]
        [Route("Project")]
        public IHttpActionResult GetAllProjects()
        {
            List<PythonProjectDM> projects = RC.PythonProjectManager.PullAll();
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, projects.Select(item => item.Map()));
        }

        [HttpGet]
        [Route("Project/Details")]
        public IHttpActionResult GetAllProjectsDetails()
        {
            List<PythonProjectDM> projects = RC.PythonProjectManager.PullAll(WithDetails: true);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, projects.Select(item => item.Map()));
        }
        #endregion

        #region POST
        [HttpPost]
        [Route("Project")]
        public IHttpActionResult CreateProject([FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.ADD, project);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion

        #region PUT
        [HttpPut]
        [Route("Project/{id:int}")]
        public IHttpActionResult UpdateProject([FromUri] int id, [FromBody] PythonProjectDM project)
        {
            RC.PythonProjectManager.Commit(CommitTypeEnum.UPDATE, project, id:id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion

        #region PATCH
        [HttpPatch]
        [Route("Project")]
        public IHttpActionResult TestDTO([FromBody] PythonProjectDTO obj)
        {
            PythonProjectDM project = obj.Map();
            if (PatchTools.IsPatch(project))
            {
                RC.PythonProjectManager.Commit(CommitTypeEnum.PATCH, project);
            }
            else
            {
                /// TODO - return error
            }
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, project.Map());
        }
        #endregion
        
    }
}
