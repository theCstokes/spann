using Spann.PythonTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Console
{
    public class PyConsoleManager
    {
        #region Private Field(s).
        private static Dictionary<Guid, PyConsole> consoles;
        #endregion

        #region Public Constructor(s).
        static PyConsoleManager()
        {
            consoles = new Dictionary<Guid, PyConsole>();
        }
        #endregion

        public static void Register(Guid uid, EventHandler<StreamNotificationEvent> handler)
        {
            consoles[uid] = new PyConsole(handler) ;
        }

        public static PyConsole Get(Guid uid)
        {
            return consoles[uid];
        }

        public static void Remove(Guid uid)
        {
            consoles.Remove(uid);
        }

        public static void Execute(Guid uid, string code)
        {
            PyConsole c = consoles[uid];
            if(c != null)
            {
                dynamic r = c.Execute(code);
                if(r != null)
                {
                    c.notify(Convert.ToString(r));
                }
            }
        }

        public PyConsole this[Guid uid]
        {
            get
            {
                return consoles[uid];
            }
            set
            {
                consoles[uid] = value;
            }
        }
    }
}
