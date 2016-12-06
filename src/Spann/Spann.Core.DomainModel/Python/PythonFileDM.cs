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
    /// <summary>
    /// Python file domain model.
    /// </summary>
    [TableItem("public", "PythonFile")]
    public class PythonFileDM : BaseDM<PythonFileDM, PythonFileDTO>, IDataModel
    {
        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        public PythonFileDM()
        {

        }
        #endregion

        #region Public Member(s).
        /// <summary>
        /// ID property.
        /// </summary>
        [IDColumn]
        public override int ID { get; set; }

        /// <summary>
        /// SourceCode property.
        /// </summary>
        [DataColumn("SourceCode")]
        public string SourceCode { get; set; }

        /// <summary>
        /// Name property.
        /// </summary>
        [DataColumn("Name")]
        public string Name { get; set; }

        /// <summary>
        /// Create a map of this domain model.
        /// </summary>
        /// <returns>Copy of this domain model in a python file data transfer object.</returns>
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
