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
        private static Dictionary<Type, object> ManagerMap = new Dictionary<Type, object>();
        private static Dictionary<Type, Type> TypeMap = new Dictionary<Type, Type>();

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
