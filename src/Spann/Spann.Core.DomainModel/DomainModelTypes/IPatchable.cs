using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ament.Core.DomainModel.DomainModelTypes
{
    interface IPatchable
    {
        string PatchType { get; set; }
        int PatchClientID { get; set; }
    }
}
