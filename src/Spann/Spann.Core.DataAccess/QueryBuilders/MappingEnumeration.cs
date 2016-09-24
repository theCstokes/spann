using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.QueryBuilders
{
    public class MappingEnumeration<TSource> : IEnumerable<TSource>
    {
        private Dictionary<string, TSource> TypeRef;
        public MappingEnumeration(Dictionary<string, TSource> TypeRef)
        {
            this.TypeRef = TypeRef;
        }

        protected static Dictionary<string, TSource> Initilize()
        {
            return new Dictionary<string, TSource>();
        }

        public IEnumerator<TSource> GetEnumerator()
        {
            return TypeRef.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        //public static List<TSource> Values { get { return TSource.Values.ToList(); } }
    }
}
