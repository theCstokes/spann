using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    public class PyFile : IPyLocation
    {
        #region Public Field(s).
        public string Location { get; private set; }
        public string Name { get; private set; }
        #endregion

        #region Private Field(s).
        private FileInfo file;
        #endregion

        #region  Public Constructor(s).
        public PyFile(string location, string name, string data = null)
        {
            this.Location = location;
            this.Name = name;
            if (!Directory.Exists(location))
            {
                Directory.CreateDirectory(location);
            }
            string path = PyTools.CreatePath(location, name);
            file = new FileInfo(path);
            using (var fs = file.Create())
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
        public bool CanDelete
        {
            get
            {
                return file != null && file.Exists;
            }
        }
        public void Delete()
        {
            if (file != null && file.Exists)
            {
                file.Delete();
            }
        }

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
