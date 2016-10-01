﻿using IronPython.Hosting;
using Microsoft.Scripting.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools
{
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
        public dynamic Execute(string code)
        {
            return engine.Execute(code, scope);
        }

        public void notify(string data)
        {
            handler(this, new StreamNotificationEvent(data));
        }
        #endregion
    }
}