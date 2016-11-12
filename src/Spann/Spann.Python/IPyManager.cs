using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools
{
    /// <summary>
    /// Iron Python Manager
    /// </summary>
    interface IPyManager
    {
        void Register(Guid uid, EventHandler<StreamNotificationEvent> handler);
    }
}
