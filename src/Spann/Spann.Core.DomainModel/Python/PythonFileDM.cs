﻿using Ament.Core.DomainModel.DomainModelTypes;
using Spann.Core.DataAccess;
using Spann.Core.DataAccess.MetaDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel.Python
{
    [TableItem("public", "PythonFile")]
    public class PythonFileDM : AbstractDataModel<PythonFileDM>, IDataModel, IPatchable
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

        public string PatchType { get; set; }

        public int PatchClientID { get; set; }
        #endregion
    }
}
