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
    }
}
