using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.DomainModel.Users
{
    [TableItemAttribute("public", "User")]
    public class UserDM : IDataModel<UserDM>
    {
        [DataColumnAttribute("Username")]
        public string Username { get; set; }

        [DataColumnAttribute("Password")]
        public string Password { get; set; }

        [IDColumnAttribute]
        public override int ID { get; set; }
    }
}