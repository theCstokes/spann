using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DomainModel.Python;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.DomainModel.DataTransferObjects.Python
{
    /// <summary>
    /// Python data transfer object (DTO).
    /// </summary>
    public class PythonFileDTO : BaseDTO<PythonFileDTO, PythonFileDM>
    {
        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        public PythonFileDTO()
        {

        }
        #endregion

        #region Public Member(s).
        /// <summary>
        /// Property for id.
        /// </summary>
        [IDColumn]
        public override int ID { get; set; }

        /// <summary>
        /// Property for source code.
        /// </summary>
        public string SourceCode { get; set; }

        /// <summary>
        /// Property for name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Create a map of this data model.
        /// </summary>
        /// <returns>Copy of this data model as a python file domain model object.</returns>
        public override PythonFileDM Map()
        {
            PythonFileDM dm = base.Map();
            dm.ID = ID;
            dm.Name = Name;
            dm.SourceCode = @SourceCode;
            return dm;
        }
        #endregion
    }
}