using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.Requests.Patch
{
    public class PatchData
    {
        public PatchTypeEnum PatchType { get; private set; }
        public int? PatchClientID { get; private set; }

        public PatchData(PatchTypeEnum type, int? id)
        {
            this.PatchType = type;
            this.PatchClientID = id;
        }
    }
}
