using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.DomainModel.Users
{
    [TableItem("public", "User")]
    public class UserDM : AbstractDataModel<UserDM>, IDataModel
    {
        [DataColumn("Name")]
        public string Name { get; set; }

        [DataColumn("Username")]
        public string Username { get; set; }

        [DataColumn("Password")]
        public string Password { get; set; }

        [IDColumn]
        public override int ID { get; set; }
    }
}