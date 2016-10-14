using Spann.Core.JsonTools;
using Spann.DomainModel.Users;
using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Spann.Controllers
{
    [RoutePrefix("api/v1")]
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("User")]
        public IHttpActionResult GetAllUsers()
        {
            List<UserDM> users = RC.UserManager.PullAll();
            return Ok(JsonUtils.SerializeObject(users));
        }
    }
}
