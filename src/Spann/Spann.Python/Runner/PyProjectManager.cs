using Spann.Core.DomainModel.Python;
using Spann.DomainModel.Users;
using Spann.PythonTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    public class PyProjectManager
    {
        #region Private Field(s).
        private static string SERVER_LOCATION
        {
            get
            {
                //Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) +
                return @"C:\PythonServer";
            }
        }
        private static Dictionary<Guid, PyProject> projects;
        #endregion

        #region Public Constructor(s).
        static PyProjectManager()
        {
            projects = new Dictionary<Guid, PyProject>();
        }
        #endregion

        public static void Register(Guid uid, EventHandler<StreamNotificationEvent> handler)
        {
            projects[uid] = new PyProject(handler) ;
        }

        public static PyProject Get(Guid uid)
        {
            return projects[uid];
        }

        public static void Remove(Guid uid)
        {
            projects.Remove(uid);
        }

        public static void Execute(Guid uid, PythonFileDM fileDM)
        {
            PyProject project = projects[uid];
            project.Create(SERVER_LOCATION, "fiddle");
            var location = PyTools.CreatePath(SERVER_LOCATION, "fiddle");
            var file = new PyFile(fileDM.ID, location, fileDM.Name, fileDM.SourceCode);
            project.AddFile(file);
            project.StartUpFileID = file.ID;
            project.Run();
        }

        public static void Execute(Guid uid, UserDM owner, PythonProjectDM project)
        {
            //PyProject p = projects[uid];
            //if (p != null)
            //{
            //    dynamic r = p.Execute(code);
            //    if (r != null)
            //    {
            //        p.notify(Convert.ToString(r));
            //    }
            //}
        }

        public PyProject this[Guid uid]
        {
            get
            {
                return projects[uid];
            }
            set
            {
                projects[uid] = value;
            }
        }
    }
}
