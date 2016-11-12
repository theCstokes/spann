using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    /// <summary>
    /// Iron Python Location.
    /// </summary>
    public interface IPyLocation
    {
        string Path { get; }
        bool CanDelete { get; }
        void Delete();
        bool DoesExist { get; }
    }
}
