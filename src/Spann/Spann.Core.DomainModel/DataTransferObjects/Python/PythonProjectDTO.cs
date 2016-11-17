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
    /// <summary>
    /// Python project domain transfer object.
    /// </summary>
    public class PythonProjectDTO : BaseDTO<PythonProjectDTO, PythonProjectDM>
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        #region Public Constructor(s).
        public PythonProjectDTO() : base()
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
        /// Name property.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Start file property (start file of project).
        /// </summary>
        public string StartFileName { get; set; }

        /// <summary>
        /// Property for files in the project.
        /// </summary>
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

        /// <summary>
        /// Create a data model of this.
        /// </summary>
        /// <returns>Copy the data of this into a python project data model.</returns>
        public override PythonProjectDM Map()
        {
            PythonProjectDM dm = base.Map();
            dm.PatchClientID = PatchClientID;
            dm.PatchType = PatchType;
            dm.ID = ID;
            dm.Name = Name;
            dm.StartFileName = StartFileName;
            dm.Files = Files.Select(item => item.Map()).ToList();
            return dm;
        }
        #endregion
    }
}