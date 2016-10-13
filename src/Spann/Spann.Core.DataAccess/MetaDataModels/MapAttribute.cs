using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Property)]
    public class MapAttribute :  Attribute
    {
        public Type DataType { get; set; }
        public string CurrentID { get; set; }
        public string ConnectionID { get; set; }
        
        public MapAttribute(Type t, string currentID, string connectionID)
        {
            this.DataType = t;
            this.CurrentID = currentID;
            this.ConnectionID = connectionID;
        }
    }
}
