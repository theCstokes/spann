using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    class PyTools
    {
        public static string CreatePath(string location, string name)
        {
            return Path.Combine(location, name);
        }

        public static string CreatePath(string location, params string[] additons)
        {
            string path = location;
            path = additons.Aggregate(path, (result, item) => Path.Combine(path, item));
            //return System.Web.HttpContext.Current.Server.MapPath(path);
            return path;
        }
    }
}
