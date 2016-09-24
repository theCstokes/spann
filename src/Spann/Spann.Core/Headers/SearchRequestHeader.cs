using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.Headers
{
    [HeaderType("SearchHeader")]
    public class SearchRequestHeader : ICustomHeaderType
    {
        public List<Data> Items;

        public SearchRequestHeader()
        {
            Items = new List<Data>();
        }
    }

    public class Data
    {
        [PropertyReference]
        public string Property { get; set; }
        public string Comparison { get; set; }
        public string Value { get; set; }
    }
}