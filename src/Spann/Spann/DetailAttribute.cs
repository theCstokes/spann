using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann
{
    /// <summary>
    /// Detail Attribute Class
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class DetailAttribute :  Attribute
    {
        /// <summary>
        /// Details property
        /// </summary>
        public string[] Details { get; private set; }
        
        /// <summary>
        /// Contructor
        /// </summary>
        /// <param name="details"></param>
        public DetailAttribute(params string[] details)
        {
            this.Details = details;
        }
    }
}
