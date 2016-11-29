using Spann.PythonTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Console
{

    /// <summary>
    /// Python console manager.
    /// </summary>
    public class PyConsoleManager
    {
        #region Private Field(s).
        private static Dictionary<Guid, PyConsole> consoles;
        #endregion

        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        static PyConsoleManager()
        {
            consoles = new Dictionary<Guid, PyConsole>();
        }
        #endregion

        /// <summary>
        /// End Of Transmission magic string
        /// </summary>
        public static string EOT
        {
            get { return @"\EOT"; }
        }

        /// <summary>
        /// Register a event handler.
        /// </summary>
        /// <param name="uid">Id for console.</param>
        /// <param name="handler">Event handler to register.</param>
        public static void Register(Guid uid, EventHandler<StreamNotificationEvent> handler)
        {
            consoles[uid] = new PyConsole(handler) ;
        }

        /// <summary>
        /// Get a python console.
        /// </summary>
        /// <param name="uid">Id for console.</param>
        /// <returns>Python console.</returns>
        public static PyConsole Get(Guid uid)
        {
            return consoles[uid];
        }

        /// <summary>
        /// Remove a console.
        /// </summary>
        /// <param name="uid">Id for console.</param>
        public static void Remove(Guid uid)
        {
            consoles.Remove(uid);
        }

        /// <summary>
        /// Execute code on a console.
        /// </summary>
        /// <param name="uid">Id for console.</param>
        /// <param name="code">Code to execute.</param>
        public static void Execute(Guid uid, string code)
        {
            PyConsole c = consoles[uid];
            if(c != null)
            {
                dynamic r = c.Execute(code);
                c.notify(EOT);
                // write to stream ("\EOT");
                // in client, on message recieve "\EOT", print next line with prompt
                if(r != null)
                {
                    c.notify(Convert.ToString(r));
                }
            }
        }

        /// <summary>
        /// Properties.
        /// </summary>
        /// <param name="uid">Id for console.</param>
        /// <returns>Get: a particular console.</returns>
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
