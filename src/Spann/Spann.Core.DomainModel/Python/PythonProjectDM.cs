using Newtonsoft.Json;
using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DataAccess.Requests.Patch;
using Spann.Core.DomainModel.DataTransferObjects.Python;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Python
{
    [TableItem("public", "PythonProject")]
    [Connection(typeof(PythonFileDM), "public", "PythonFileProjectConnector")]
    public class PythonProjectDM : BaseDM<PythonProjectDM, PythonProjectDTO>, IDataModel
    {
        #region Public Constructor(s).
        public PythonProjectDM()
        {
            this.Files = new List<PythonFileDM>();
        }
        #endregion

        #region Public Member(s).
        [IDColumn]
        public override int ID { get; set; }

        [DataColumn("Name")]
        public string Name { get; set; }
        
        [IDColumn("StartFileID")]
        public int? StartFile { get; set; }

        [Detail(PatchTypeEnum.Enum.Create, PatchTypeEnum.Enum.Update, PatchTypeEnum.Enum.Delete)]
        [Map(typeof(PythonFileDM), "ProjectID", "FileID")]
        public List<PythonFileDM> Files { get; set; }

        public override PythonProjectDTO Map()
        {            
            PythonProjectDTO p = new PythonProjectDTO
            {
                ID = ID,
                Name = Name,
                StartFile = StartFile,
                
            };
            p.Files = Files.Select(item => item.Map()).ToList();
            return p;
        }
        #endregion
    }
}
