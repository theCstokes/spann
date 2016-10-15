using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools
{
    public class StreamNotificationEvent : EventArgs
    {
        public StreamNotificationEvent(string value)
        {
            this.Value = value;
        }

        public string Value { set; get; }
    }
    public class NotificationStreamWriter : StreamWriter
    {
        public event EventHandler<StreamNotificationEvent> NotificationWritten;

        public NotificationStreamWriter(Stream stream) : base(stream)
        {

        }

        public override void Write(string value)
        {
            base.Write(value);
            NotificationWritten?.Invoke(this, new StreamNotificationEvent(value));
        }

        public override void Write(bool value)
        {
            base.Write(value);
            NotificationWritten?.Invoke(this, new StreamNotificationEvent(value.ToString()));
        }
    }
}
