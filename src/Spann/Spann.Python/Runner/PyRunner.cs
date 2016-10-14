using Spann.Core.DomainModel.Python;
using Spann.DomainModel.Users;
using Spann.PythonTools.Runner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools
{
    class PyRunner
    {
        public static void Launch(UserDM owner, PythonProjectDM projectDM)
        {
            var project = PyServerManager.CreateProject(owner.Username, projectDM.Name);
            projectDM.Files.ForEach(fileDM =>
            {
                var file = PyServerManager.CreateFile(owner.Username, fileDM.Name, fileDM.SourceCode);
                project.AddFile(file);
            });
        }
    }
}
