using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Message
{
    /// <summary>
    /// Message domain model.
    /// </summary>
    [TableItem("Messages", "User")]
    public class MessageDM : AbstractDataModel<MessageDM>, IDataModel
    {
        /// <summary>
        /// Property for data.
        /// </summary>
        [DataColumn("Data")]
        public string Data { get; set; }

        /// <summary>
        /// Propery for id.
        /// </summary>
        [IDColumn]
        public override int ID { get; set; }

        /// <summary>
        /// Property for sending user id.
        /// </summary>
        [DataColumn("SendingUserID")]
        [IDColumn("SendingUserID", "SendingUserID")]
        public int SendingUserID { get; set; }

        /// <summary>
        /// Property for receiving user id.
        /// </summary>
        [DataColumn("ReceivingUserID")]
        [IDColumn("ReceivingUserID", "ReceivingUserID")]
        public int ReceivingUserID { get; set; }
    }
}
