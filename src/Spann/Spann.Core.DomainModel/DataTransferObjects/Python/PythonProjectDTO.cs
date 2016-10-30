using Microsoft.CSharp.RuntimeBinder;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DomainModel.Python;
using Spann.Core.JsonTools;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace Spann.Core.DomainModel.DataTransferObjects.Python
{
    public class PythonProjectDTO : BaseDTO<PythonProjectDTO, PythonProjectDM>
    {
        #region Public Constructor(s).
        public PythonProjectDTO() : base()
        {
        }
        #endregion

        #region Public Member(s).
        [IDColumn]
        public override int ID { get; set; }

        public string Name { get; set; }

        public int? StartFile { get; set; }

        [JsonIgnore]
        public List<PythonFileDTO> Files
        {
            get
            {
                return GetDetail<PythonFileDTO>("files");
            }
            set
            {
                UpdateDetail<PythonFileDTO>("files", value);
            }
        }

        public override PythonProjectDM Map()
        {
            PythonProjectDM dm = base.Map();
            dm.PatchClientID = PatchClientID;
            dm.PatchType = PatchType;
            dm.ID = ID;
            dm.Name = Name;
            dm.StartFile = StartFile;
            dm.Files = Files.Select(item => item.Map()).ToList();
            return dm;
        }
        #endregion
    }
}