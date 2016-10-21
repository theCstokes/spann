using Spann.Core.Headers;
using Spann.Core.JsonTools;
using Spann.DomainModel.Users;
using Spann.RepositoryModel;
using Spann.ResponseBuilders;
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

            List<UserDM> users = null;
            if (Request.Headers.Contains("SearchHeader"))
            {
                SearchRequestHeader header = Request.RetrieveHeader<SearchRequestHeader>();
                users = RC.UserManager.PullAll(u => u.Username == header.Items[0].Value);
            }
            else
            {
                users = RC.UserManager.PullAll();
            }
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, users);
        }

        [HttpPost]
        [Route("User/Login")]
        public IHttpActionResult Login([FromBody] UserDM user)
        {
            var foundUser = RC.UserManager.Pull(u => u.Name == user.Name);
            if(foundUser != null)
            {
                return ResponseUtils.CreateResponse(HttpStatusCode.OK, foundUser.Password == user.Password);
            }
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, false);
        }

        [HttpPost]
        [Route("User/Create")]
        public IHttpActionResult Create([FromBody] UserDM user)
        {
            RC.UserManager.Commit(CommitTypeEnum.ADD, user);
            return ResponseUtils.CreateResponse(HttpStatusCode.OK, user);
        }
    }
}
