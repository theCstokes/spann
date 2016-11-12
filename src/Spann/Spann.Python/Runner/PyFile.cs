using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Spann.PythonTools.Runner
{
    /// <summary>
    /// Python file.
    /// </summary>
    public class PyFile : IPyLocation
    {
        #region Public Field(s).
        public string Location { get; private set; }
        public string Name { get; private set; }
        public int ID { get; private set; }
        #endregion

        #region Private Field(s).
        private FileInfo file;
        #endregion

        #region  Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="id">Id for file.</param>
        /// <param name="location">Location for file.</param>
        /// <param name="name">Name of file.</param>
        /// <param name="data">Data in file.</param>
        public PyFile(int id, string location, string name, string data = null)
        {
            this.ID = id;
            this.Location = location;
            this.Name = name;
            if (!Directory.Exists(location))
            {
                Directory.CreateDirectory(location);
            }
            
            string path = PyTools.CreatePath(location, name);
            file = new FileInfo(path);
            using(var fs = file.Create())
            {
                if (data != null)
                {
                    Byte[] info = new UTF8Encoding(true).GetBytes(data);
                    fs.Write(info, 0, info.Length);
                }
            }
        }
        #endregion

        #region Public Member(s).
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
                return file != null && file.Exists;
            }
        }

        /// <summary>
        /// Delete a file.
        /// </summary>
        public void Delete()
        {
            if (file != null && file.Exists)
            {
                file.Delete();
            }
        }

        /// <summary>
        /// Property for does exist.
        /// </summary>
        public bool DoesExist
        {
            get
            {
                return file != null && file.Exists;
            }
        }
        #endregion
    }
}
