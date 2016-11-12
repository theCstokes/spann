using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    /// <summary>
    /// Python tools.
    /// </summary>
    class PyTools
    {
        /// <summary>
        /// Create a path.
        /// </summary>
        /// <param name="location">Location to create.</param>
        /// <param name="name">Name to create.</param>
        /// <returns></returns>
        public static string CreatePath(string location, string name)
        {
            return Path.Combine(location, name);
        }

        /// <summary>
        /// Create a path.
        /// </summary>
        /// <param name="location">Location to create.</param>
        /// <param name="additons">Combine additions to form a path.</param>
        /// <returns></returns>
        public static string CreatePath(string location, params string[] additons)
        {
            string path = location;
            path = additons.Aggregate(path, (result, item) => Path.Combine(path, item));
            //return System.Web.HttpContext.Current.Server.MapPath(path);
            return path;
        }
    }
}
