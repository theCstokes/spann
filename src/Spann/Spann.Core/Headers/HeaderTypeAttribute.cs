using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.Headers
{
    /// <summary>
    /// Header type attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class HeaderTypeAttribute : Attribute
    {
        public string Name { get; private set; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="name">Name</param>
        public HeaderTypeAttribute(string name)
        {
            this.Name = name;
        }
    }
}