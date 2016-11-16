using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.RepositoryModel
{
    public static class RepositoryUtils
    {
        public static bool Contains<T>(this IList data, Func<T, bool> check)
        {
            foreach (var item in data)
            {
                if (check((T)item))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
