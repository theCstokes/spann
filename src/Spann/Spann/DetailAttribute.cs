using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class DetailAttribute :  Attribute
    {
        public string[] Details { get; private set; }
        
        public DetailAttribute(params string[] details)
        {
            this.Details = details;
        }
    }
}
