using Newtonsoft.Json;
using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Python
{
    [TableItem("public", "PythonProject")]
    [Connection(typeof(PythonFileDM), "public", "PythonFileProjectConnector")]
    public class PythonProjectDM : AbstractDataModel<PythonProjectDM>, IDataModel
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

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Map(typeof(PythonFileDM), "ProjectID", "FileID")]
        public List<PythonFileDM> Files { get; set; }
        #endregion
    }
}
