using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    /// <summary>
    /// Python project.
    /// </summary>
    public class PyProject : IPyLocation
    {
        #region Public Field(s).
        public string Location { get; private set; }
        public string Name { get; private set; }

        public int? StartUpFileID { get; set; }
        #endregion

        #region Private Field(s).
        private DirectoryInfo directory;
        private List<PyFile> files;
        private EventHandler<StreamNotificationEvent> handler;
        #endregion

        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="handler">Handler for project.</param>
        public PyProject(EventHandler<StreamNotificationEvent> handler)
        {
            this.files = new List<PyFile>();
            this.handler = handler;
        }
        #endregion

        #region Public Member(s).
        /// <summary>
        /// Create a project.
        /// </summary>
        /// <param name="location">Location for project.</param>
        /// <param name="name">Name of project.</param>
        public void Create(string location, string name)
        {
            this.Location = location;
            this.Name = name;
            string path = PyTools.CreatePath(location, name);
            directory = Directory.CreateDirectory(path);
        }

        /// <summary>
        /// Property for path.
        /// </summary>
        public string Path
        {
            get
            {
                return PyTools.CreatePath(Location, Name);
            }
        }

        /// <summary>
        /// Property for can delete.
        /// </summary>
        public bool CanDelete
        {
            get
            {
                if (directory != null && directory.Exists)
                {
                    return files.Count(file => file.DoesExist) == 0;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// Delete a project.
        /// </summary>
        public void Delete()
        {
            if(directory != null && directory.Exists)
            {
                directory.Delete();
            }
        }

        /// <summary>
        /// Property for does exist.
        /// </summary>
        public bool DoesExist
        {
            get
            {
                return directory != null && directory.Exists;
            }
        }

        /// <summary>
        /// Add a python file.
        /// </summary>
        /// <param name="file">File name.</param>
        public void AddFile(PyFile file)
        {
            files.Add(file);
        }

        /// <summary>
        /// Run a python project.
        /// </summary>
        public void Run()
        {
            if(StartUpFileID == null)
            {
                return;
            }
            ProcessStartInfo pythonInfo = new ProcessStartInfo();
            var startupFile = files.First(f => f.ID == StartUpFileID);

            //pythonInfo.FileName = @"C:\Python27\python.exe";
            pythonInfo.FileName = "python";
            pythonInfo.Arguments = startupFile.Path;
            pythonInfo.CreateNoWindow = false;
            pythonInfo.UseShellExecute = false;
            pythonInfo.RedirectStandardOutput = true;
            pythonInfo.RedirectStandardError = true;

            using (Process process = Process.Start(pythonInfo))
            {
                string result = "";
                using (StreamReader reader = process.StandardOutput)
                {
                    result += reader.ReadToEnd();
                    handler(this, new StreamNotificationEvent(result));
                }

                using(StreamReader reader = process.StandardError)
                {
                    result += reader.ReadToEnd();
                }
                handler(this, new StreamNotificationEvent(result));
            }
        }
        #endregion
    }
}
