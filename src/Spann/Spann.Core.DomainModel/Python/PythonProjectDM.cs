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
    /// <summary>
    /// Python project domain model.
    /// </summary>
    [TableItem("public", "PythonProject")]
    [Connection(typeof(PythonFileDM), "public", "PythonFileProjectConnector")]
    public class PythonProjectDM : BaseDM<PythonProjectDM, PythonProjectDTO>, IDataModel
    {
        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        public PythonProjectDM()
        {
            this.Files = new List<PythonFileDM>();
        }
        #endregion

        #region Public Member(s).
        /// <summary>
        /// Property for id.
        /// </summary>
        [IDColumn]
        public override int ID { get; set; }

        /// <summary>
        /// Property for name.
        /// </summary>
        [DataColumn("Name")]
        public string Name { get; set; }
        
        /// <summary>
        /// Property for start file.
        /// </summary>
        [IDColumn("StartFileID")]
        public string StartFileName { get; set; }

        /// <summary>
        /// Property for files.
        /// </summary>
        [Detail(PatchTypeEnum.Enum.Create, PatchTypeEnum.Enum.Update, PatchTypeEnum.Enum.Delete)]
        [Map(typeof(PythonFileDM), "ProjectID", "FileID")]
        public List<PythonFileDM> Files { get; set; }

        /// <summary>
        /// Create a new user domain object.
        /// </summary>
        /// <returns>Copy data into a new domain model.</returns>
        public override PythonProjectDTO Map()
        {            
            PythonProjectDTO p = new PythonProjectDTO
            {
                ID = ID,
                Name = Name,
                StartFileName = StartFileName,
                
            };
            p.Files = Files.Select(item => item.Map()).ToList();
            return p;
        }
        #endregion
    }
}
