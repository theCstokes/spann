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
    /// <summary>
    /// User data model.
    /// </summary>
    [TableItem("public", "User")]
    public class UserDM : BaseDM<UserDM, UserDTO>, IDataModel
    {
        /// <summary>
        /// Property for name.
        /// </summary>
        [DataColumn("Name")]
        public string Name { get; set; }

        /// <summary>
        /// Property for username.
        /// </summary>
        [DataColumn("Username")]
        public string Username { get; set; }

        /// <summary>
        /// Property for password.
        /// </summary>
        [DataColumn("Password")]
        public string Password { get; set; }

        /// <summary>
        /// Property for salt.
        /// </summary>
        [DataColumn("Salt")]
        public string Salt { get; set; }

        /// <summary>
        /// Property for id.
        /// </summary>
        [IDColumn]
        public override int ID { get; set; }

        /// <summary>
        /// Create a new user domain model.
        /// </summary>
        /// <returns>Copy of data into a new user domain model.</returns>
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