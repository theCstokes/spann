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
    public class FiddleController : ApiController
    {

        [HttpPost]
        [Route("Run")]
        public IHttpActionResult RunFile([FromBody] PythonFileDM file)
        {
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, file);
        }
    }
}
