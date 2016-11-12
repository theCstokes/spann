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
    /// <summary>
    /// Python project Manager.
    /// </summary>
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
        /// <summary>
        /// Constructor.
        /// </summary>
        static PyProjectManager()
        {
            projects = new Dictionary<Guid, PyProject>();
        }
        #endregion

        /// <summary>
        /// Register handler with a project.
        /// </summary>
        /// <param name="uid">Id for project.</param>
        /// <param name="handler">Handler for project.</param>
        public static void Register(Guid uid, EventHandler<StreamNotificationEvent> handler)
        {
            projects[uid] = new PyProject(handler) ;
        }

        /// <summary>
        /// Get a project.
        /// </summary>
        /// <param name="uid">Id for project.</param>
        /// <returns>Python project.</returns>
        public static PyProject Get(Guid uid)
        {
            return projects[uid];
        }

        /// <summary>
        ///  Remove a project.
        /// </summary>
        /// <param name="uid">Id for project.</param>
        public static void Remove(Guid uid)
        {
            projects.Remove(uid);
        }

        /// <summary>
        /// Execute a project.
        /// </summary>
        /// <param name="uid">Id for project.</param>
        /// <param name="fileDM">File domain model.</param>
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

        /// <summary>
        /// Execute a project.
        /// </summary>
        /// <param name="uid">Id for project.</param>
        /// <param name="owner">Owner of a project.</param>
        /// <param name="project">Project domain model.</param>
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

        /// <summary>
        /// Property for projects.
        /// </summary>
        /// <param name="uid">Id for proejct.</param>
        /// <returns>Get: project.</returns>
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
