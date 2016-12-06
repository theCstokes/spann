using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.Headers
{
    /// <summary>
    /// Custom header for search requests
    /// </summary>
    [HeaderType("SearchHeader")]
    public class SearchRequestHeader : ICustomHeaderType
    {
        public List<Data> Items;

        /// <summary>
        /// Constructor
        /// </summary>
        public SearchRequestHeader()
        {
            Items = new List<Data>();
        }
    }

    /// <summary>
    /// Simple data object
    /// </summary>
    public class Data
    {
        [PropertyReference]
        public string Property { get; set; }
        public string Comparison { get; set; }
        public string Value { get; set; }
    }
}