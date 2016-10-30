using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DomainModel;
using Spann.Core.DomainModel.DataTransferObjects.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.DomainModel.Users
{
    [TableItem("public", "User")]
    public class UserDM : BaseDM<UserDM, UserDTO>, IDataModel
    {
        [DataColumn("Name")]
        public string Name { get; set; }

        [DataColumn("Username")]
        public string Username { get; set; }

        [DataColumn("Password")]
        public string Password { get; set; }

        [DataColumn("Salt")]
        public string Salt { get; set; }

        [IDColumn]
        public override int ID { get; set; }

        public override UserDTO Map()
        {
            return new UserDTO
            {
                ID = ID,
                Name = Name,
                Username = Username,
                Password = Password,
                Salt = Salt
            };
        }
    }
}