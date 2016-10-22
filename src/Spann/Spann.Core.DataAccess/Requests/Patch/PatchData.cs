using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.Requests.Patch
{
    public class PatchData
    {
        public PatchType PatchType { get; private set; }
        public int? PatchClientID { get; private set; }

        public PatchData(PatchType type, int? id)
        {
            this.PatchType = type;
            this.PatchClientID = id;
        }
    }
}
