using Spann.DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.DataTransferObjects.User
{
    public class UserDTO : BaseDTO<UserDTO, UserDM>
    {

        #region Public Member(s).
        public override int ID { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Salt { get; set; }

        public override UserDM Map()
        {
            UserDM dm = base.Map();
            dm.Name = Name;
            dm.Username = Username;
            dm.Password = Password;
            dm.Salt = Salt;
            return dm;
        }
        #endregion
    }
}
