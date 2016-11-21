using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using Spann.Core.DataAccess;
using Spann.Core.DomainModel.DataTransferObjects.Python;
using Spann.Core.DomainModel.Python;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Spann.Core.DomainModel.DataTransferObjects.Python
{
    [TestClass]
    public class PythonFileDTOTest
    {
        [TestMethod]
        public void DoesMapToDM()
        {
            //JObject obj = JObject.FromObject(new { name = "123", files = new[] { 1, 2, 3 }  }); // This is needed for project
            PythonFileDTO dto = new PythonFileDTO();
            dto.ID = 3;
            dto.Name = "MyTestDTO";
            dto.PatchClientID = 1;
            dto.PatchType = "create";
            dto.SourceCode = "1231213123";

            PythonFileDM dm = dto.Map();

            Assert.AreEqual(dto.ID, dm.ID);
            Assert.AreEqual(dto.Name, dm.Name);
            Assert.AreEqual(dto.SourceCode, dm.SourceCode);
            AbstractDataModel<PythonFileDM> adm = dm as AbstractDataModel<PythonFileDM>;

            Assert.AreEqual(dto.PatchClientID, adm.PatchClientID);
            Assert.AreEqual(dto.PatchType, adm.PatchType);
        }
    }
}
