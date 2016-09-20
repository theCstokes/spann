using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Message
{
    [TableItemAttribute("Messages", "User")]
    public class MessageDM : IDataModel<MessageDM>
    {
        [DataColumnAttribute("Data")]
        public string Data { get; set; }

        [IDColumnAttribute]
        public override int ID { get; set; }

        [DataColumnAttribute("SendingUserID")]
        [IDColumnAttribute("SendingUserID", "SendingUserID")]
        public int SendingUserID { get; set; }

        [DataColumnAttribute("ReceivingUserID")]
        [IDColumnAttribute("ReceivingUserID", "ReceivingUserID")]
        public int ReceivingUserID { get; set; }
    }
}
