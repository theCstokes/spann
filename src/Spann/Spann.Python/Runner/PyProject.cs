using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
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
        public PyProject(EventHandler<StreamNotificationEvent> handler)
        {
            this.files = new List<PyFile>();
            this.handler = handler;
        }
        #endregion

        #region Public Member(s).
        public void Create(string location, string name)
        {
            this.Location = location;
            this.Name = name;
            string path = PyTools.CreatePath(location, name);
            directory = Directory.CreateDirectory(path);
        }

        public string Path
        {
            get
            {
                return PyTools.CreatePath(Location, Name);
            }
        }
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
        public void Delete()
        {
            if(directory != null && directory.Exists)
            {
                directory.Delete();
            }
        }

        public bool DoesExist
        {
            get
            {
                return directory != null && directory.Exists;
            }
        }

        public void AddFile(PyFile file)
        {
            files.Add(file);
        }

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

            using (Process process = Process.Start(pythonInfo))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    //NotificationStreamWriter nsw = new NotificationStreamWriter(reader.BaseStream);
                    //nsw.NotificationWritten += handler;
                    string result = reader.ReadToEnd();
                    handler(this, new StreamNotificationEvent(result)); //TODO - Might need to do this.
                }
            }
        }
        #endregion
    }
}
