using Spann.Core.DomainModel.Message;
using Spann.DomainModel.Users;
using Spann.RepositoryModel.Message;
using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Spann.RepositoryModel.Python;

namespace Spann.RepositoryModel
{
    /// <summary>
    /// Static Data Repository Models.
    /// </summary>
    public class RC
    {
        //public static MessageRManager MessageList = new MessageRManager();
        public static BaseRepositoryManager<MessageDM> MessageManager = new BaseRepositoryManager<MessageDM>();
        public static BaseRepositoryManager<UserDM> UserManager = new BaseRepositoryManager<UserDM>();
        public static PythonFileRepositoryManager PythonFileManager = new PythonFileRepositoryManager();
    }
}
