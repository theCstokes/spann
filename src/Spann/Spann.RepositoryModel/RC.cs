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
using Spann.Core.DomainModel.Python;

namespace Spann.RepositoryModel
{
    /// <summary>
    /// Static Data Repository Models.
    /// </summary>
    public class RC
    {
        private static Dictionary<Type, object> ManagerMap = new Dictionary<Type, object>();
        private static Dictionary<Type, Type> TypeMap = new Dictionary<Type, Type>();

        public static BaseRepositoryManager<MessageDM> MessageManager = 
            Register(typeof(MessageDM), new BaseRepositoryManager<MessageDM>());

        public static BaseRepositoryManager<UserDM> UserManager =
            Register(typeof(UserDM), new BaseRepositoryManager<UserDM>());

        public static BaseRepositoryManager<PythonFileDM> PythonFileManager =
            Register(typeof(PythonFileDM), new BaseRepositoryManager<PythonFileDM>());

        public static BaseRepositoryManager<PythonProjectDM> PythonProjectManager =
            Register(typeof(PythonProjectDM), new BaseRepositoryManager<PythonProjectDM>());

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
