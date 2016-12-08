using Microsoft.VisualStudio.TestTools.UnitTesting;
using Spann.Core.DomainModel.Python;
using Spann.PythonTools.Runner;
using Spann.Test.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Spann.PythonTools
{
    [TestClass]
    public class PythonRunTest
    {
        [TestMethod]
        public void TestValidRun()
        {
            PythonFileDM file = new PythonFileDM();
            file.ID = TestingTools.RandomInt;
            file.Name = TestingTools.RandomString;
            file.SourceCode = "print 123";

            Guid instanceUID = new Guid();

            PyProjectManager.Register(instanceUID, (sender, e) => Assert.AreEqual(e.Value, "123\r\n"));
            PyProjectManager.Execute(new Guid(), file);
        }

        [TestMethod]
        public void TestErrorRun()
        {
            PythonFileDM file = new PythonFileDM();
            file.ID = TestingTools.RandomInt;
            file.Name = TestingTools.RandomString + ".py";
            file.SourceCode = "System.out.println(123)";

            Guid instanceUID = new Guid();

            var returnCount = 0;

            PyProjectManager.Register(instanceUID, (sender, e) => {
                if(returnCount == 0)
                {
                    Assert.AreEqual(e.Value, "");
                } else if(returnCount == 1)
                {
                    var result2 = String.Format("Traceback (most recent call last):\r\n  File \"C:\\PythonServer\\fiddle{0}\\{1}\", line 1, in <module>\r\n    System.out.println(123)\r\nNameError: name 'System' is not defined\r\n", instanceUID, file.Name);
                    Assert.AreEqual(e.Value, result2);
                }
                returnCount ++;
                });
            PyProjectManager.Execute(instanceUID, file);
        }
    }
}
