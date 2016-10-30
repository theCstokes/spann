using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DomainModel.Python;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann.Core.DomainModel.DataTransferObjects.Python
{
    public class PythonFileDTO : BaseDTO<PythonFileDTO, PythonFileDM>
    {
        #region Public Constructor(s).
        public PythonFileDTO()
        {

        }
        #endregion

        #region Public Member(s).
        [IDColumn]
        public override int ID { get; set; }

        public string SourceCode { get; set; }

        public string Name { get; set; }

        public override PythonFileDM Map()
        {
            PythonFileDM dm = base.Map();
            dm.ID = ID;
            dm.Name = Name;
            dm.SourceCode = SourceCode;
            return dm;
        }


        #endregion
    }
}