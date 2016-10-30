using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DomainModel.DataTransferObjects.Python;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Python
{
    [TableItem("public", "PythonFile")]
    public class PythonFileDM : BaseDM<PythonFileDM, PythonFileDTO>, IDataModel
    {
        #region Public Constructor(s).
        public PythonFileDM()
        {

        }
        #endregion

        #region Public Member(s).
        [IDColumn]
        public override int ID { get; set; }

        [DataColumn("SourceCode")]
        public string SourceCode { get; set; }

        [DataColumn("Name")]
        public string Name { get; set; }

        public override PythonFileDTO Map()
        {
            return new PythonFileDTO
            {
                ID = ID,
                Name = Name,
                SourceCode = SourceCode
            };
        }
        #endregion
    }
}
