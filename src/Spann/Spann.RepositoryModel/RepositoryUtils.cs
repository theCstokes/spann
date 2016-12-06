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
        public static int FirstIndex<T>(this IList data, Func<T, bool> check)
        {
            int index = 0;
            foreach (var item in data)
            {
                if (check((T)item))
                {
                    return index;
                }
                index++;
            }
            return -1;
        }
    }
}
