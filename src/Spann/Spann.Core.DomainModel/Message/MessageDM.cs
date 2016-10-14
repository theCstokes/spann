using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Message
{
    [TableItem("Messages", "User")]
    public class MessageDM : AbstractDataModel<MessageDM>, IDataModel
    {
        [DataColumn("Data")]
        public string Data { get; set; }

        [IDColumn]
        public override int ID { get; set; }

        [DataColumn("SendingUserID")]
        [IDColumn("SendingUserID", "SendingUserID")]
        public int SendingUserID { get; set; }

        [DataColumn("ReceivingUserID")]
        [IDColumn("ReceivingUserID", "ReceivingUserID")]
        public int ReceivingUserID { get; set; }
    }
}
