using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.BaseDomainModel
{
    public class ConnectionDM : AbstractDataModel<ConnectionDM>, IDataModel
    {

        [IDColumn]
        public override int ID { get; set; }

        [LookupPropertyAttribute]
        [IDColumn("ParentID", "ParentID")]
        public int ParentID { get; set; }

        [LookupPropertyAttribute]
        [IDColumn("ChildID", "ChildID")]
        public int ChildID { get; set; }
    }
}
