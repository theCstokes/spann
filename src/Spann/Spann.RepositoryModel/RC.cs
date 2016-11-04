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
    public class RC
    {
        private static Dictionary<Type, object> ManagerMap = new Dictionary<Type, object>();
        private static Dictionary<Type, Type> TypeMap = new Dictionary<Type, Type>();

        public static DefaultRepositoryManager<MessageDM> MessageManager = 
            Register(typeof(MessageDM), new DefaultRepositoryManager<MessageDM>());

        public static DefaultRepositoryManager<UserDM> UserManager =
            Register(typeof(UserDM), new DefaultRepositoryManager<UserDM>());

        public static DefaultRepositoryManager<PythonFileDM> PythonFileManager =
            Register(typeof(PythonFileDM), new DefaultRepositoryManager<PythonFileDM>());

        public static PatchRepositoryManager<PythonProjectDM> PythonProjectManager =
            Register(typeof(PythonProjectDM), new PatchRepositoryManager<PythonProjectDM>());

        private static TSource Register<TSource>(Type t, TSource value)
        {
            ManagerMap[t] = value;
            TypeMap[t] = value.GetType();
            return value;
        }

        public static object GetManager(Type t)
        {
            return ManagerMap[t];
        }

        public static Type GetManagerType(Type t)
        {
            return TypeMap[t];
        }
    }
}
