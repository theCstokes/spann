using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Runner
{
    public interface IPyLocation
    {
        bool CanDelete { get; }
        void Delete();

        bool DoesExist { get; }
    }
}
