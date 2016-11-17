using Newtonsoft.Json.Linq;
using Spann.Core.DomainModel.Python;
using Spann.Core.JsonTools;
using Spann.DomainModel.Users;
using Spann.Notifications;
using Spann.PythonTools;
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
    /// API Controller for files
    /// </summary>
    [RoutePrefix("api/v1/Python")]
    public class FileController : ApiController
    {
        #region GET
        /// <summary>
        /// Endpoint for file get.
        /// </summary>
        /// <returns>API response.</returns>
        [HttpGet]
        [Route("File")]
        public IHttpActionResult GetFiles()
        {
            var results = RC.PythonFileManager.PullAll();
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, results);
        }

        /// <summary>
        /// Endpoint for file get.
        /// </summary>
        /// <returns>API response.</returns>
        [HttpGet]
        [Route("File/{id:int}")]
        public IHttpActionResult GetFile([FromUri] int id)
        {
            var result = RC.PythonFileManager.Pull((item) => item.ID == id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, result);
        }
        #endregion

        #region PUT
        /// <summary>
        /// Endpoint for file update.
        /// </summary>
        /// <param name="file"></param>
        /// <returns>API response.</returns>
        [HttpPut]
        [Route("File/{id:int}")]
        public IHttpActionResult UpdateFile([FromBody] PythonFileDM file, [FromUri] int id)
        {
            RC.PythonFileManager.Commit(CommitTypeEnum.UPDATE, file, id:id);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, file);
        }
        #endregion

        #region POST
        /// <summary>
        /// Create a new file.
        /// </summary>
        /// <param name="file">File object.</param>
        /// <returns>Status code and file object.</returns>
        [HttpPost]
        [Route("File")]
        public IHttpActionResult CreateFile([FromBody] PythonFileDM file)
        {
            RC.PythonFileManager.Commit(CommitTypeEnum.ADD, file);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, file);
        }
        #endregion
    }
}
