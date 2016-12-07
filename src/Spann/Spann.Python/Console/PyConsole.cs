using IronPython.Hosting;
using Microsoft.Scripting.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools.Console
{
    /// <summary>
    /// Python console.
    /// </summary>
    public class PyConsole
    {
        #region Private Field(s).
        private EventHandler<StreamNotificationEvent> handler;
        private MemoryStream outputStream;
        private MemoryStream errorStream;
        private NotificationStreamWriter outputWriter;
        private NotificationStreamWriter errorWriter;
        private ScriptEngine engine;
        private dynamic scope;
        #endregion

        #region Public Constructor(s).
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="handler">Handler object.</param>
        public PyConsole(EventHandler<StreamNotificationEvent> handler)
        {
            this.handler = handler;
            outputStream = new MemoryStream();
            errorStream = new MemoryStream();
            outputWriter = new NotificationStreamWriter(outputStream);
            outputWriter.NotificationWritten += handler;

            errorWriter = new NotificationStreamWriter(errorStream);
            errorWriter.NotificationWritten += handler;

            engine = Python.CreateEngine();
            engine.Runtime.IO.SetOutput(outputStream, outputWriter);
            engine.Runtime.IO.SetErrorOutput(errorStream, errorWriter);
            scope = engine.CreateScope();
        }
        #endregion

        #region Public Member(s).
        /// <summary>
        /// Execute code and return a dynamic with results.
        /// </summary>
        /// <param name="code">String of code to execute.</param>
        /// <returns>Dynamic with result.</returns>
        public dynamic Execute(string code)
        {
            try
            {
                dynamic result = engine.Execute(code, scope);
                return result;
            } catch (Exception e)
            {
                ExceptionOperations eo = engine.GetService<ExceptionOperations>();
                string error = eo.FormatException(e).TrimEnd('\n');
                errorWriter.Write(error);
                return null;
            }

        }

        /// <summary>
        /// Notify handler with data.
        /// </summary>
        /// <param name="data">Data to notify with.</param>
        public void notify(string data)
        {
            handler(this, new StreamNotificationEvent(data));
        }
        #endregion
    }
}
