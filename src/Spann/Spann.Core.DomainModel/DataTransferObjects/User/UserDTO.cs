using Spann.DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.DataTransferObjects.User
{
    /// <summary>
    /// User domain transfer object.
    /// </summary>
    public class UserDTO : BaseDTO<UserDTO, UserDM>
    {

        #region Public Member(s).
        /// <summary>
        /// ID property. 
        /// </summary>
        public override int ID { get; set; }

        /// <summary>
        /// Name property. 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Username property. 
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Password property. 
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Salt property. 
        /// </summary>
        public string Salt { get; set; }

        /// <summary>
        /// Create a data model of this.
        /// </summary>
        /// <returns>Copy the data into a user data model object.</returns>
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
