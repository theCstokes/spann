using System;
using System.Collections.Generic;
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
        #endregion

        #region Private Field(s).
        private DirectoryInfo directory;
        private List<PyFile> files;
        #endregion

        #region Public Constructor(s).
        public PyProject(string location, string name)
        {
            this.Location = location;
            this.Name = name;
            string path = PyTools.CreatePath(location, name);
            directory = Directory.CreateDirectory(path);
            files = new List<PyFile>();
        }
        #endregion

        #region Public Member(s).
        public bool CanDelete
        {
            get
            {
                if (directory != null && directory.Exists)
                {
                    return files.Count(file => file.DoesExist()) == 0;
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

        public bool DoesExist()
        {
            return directory != null && directory.Exists;
        }

        public void AddFile(PyFile file)
        {
            files.Add(file);
        }
        #endregion
    }
}
