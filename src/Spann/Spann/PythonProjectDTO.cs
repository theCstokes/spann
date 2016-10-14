using Ament.Core.DomainModel.DomainModelTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann
{
    [Detail("Files")]
    public class PythonProjectDTO : IPatchable
    {
        public int PatchClientID { get; set; }

        public string PatchType { get; set; }

        public string Name { get; set; }

        public List<PythonFileDTO>
    }
}