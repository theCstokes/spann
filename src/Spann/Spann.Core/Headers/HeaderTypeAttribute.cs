using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.Headers
{
    [AttributeUsage(AttributeTargets.Class)]
    public class HeaderTypeAttribute : Attribute
    {
        public string Name { get; private set; }
        public HeaderTypeAttribute(string name)
        {
            this.Name = name;
        }
    }
}