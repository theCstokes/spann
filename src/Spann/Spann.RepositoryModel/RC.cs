using Spann.Core.DomainModel.Message;
using Spann.DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Spann.Core.DomainModel.Python;
using Spann.RepositoryModel.RepositoryManagers;

namespace Spann.RepositoryModel
{
    /// <summary>
    /// Static Data Repository Models.
    /// </summary>
    public partial class RC
    {
        public static DefaultRepositoryManager<MessageDM> MessageManager = 
            Register(typeof(MessageDM), new DefaultRepositoryManager<MessageDM>());

        public static DefaultRepositoryManager<UserDM> UserManager =
            Register(typeof(UserDM), new DefaultRepositoryManager<UserDM>());

        public static DefaultRepositoryManager<PythonFileDM> PythonFileManager =
            Register(typeof(PythonFileDM), new DefaultRepositoryManager<PythonFileDM>());

        public static PatchRepositoryManager<PythonProjectDM> PythonProjectManager =
            Register(typeof(PythonProjectDM), new PatchRepositoryManager<PythonProjectDM>());
    }
}
