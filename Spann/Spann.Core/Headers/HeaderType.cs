using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.Headers
{
    [AttributeUsage(AttributeTargets.Class)]
    public class HeaderType : Attribute
    {
        public string Name { get; private set; }
        public HeaderType(string name)
        {
            this.Name = name;
        }
    }
}