using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.PythonTools
{
    /// <summary>
    /// Stream Notification Event.
    /// </summary>
    public class StreamNotificationEvent : EventArgs
    {
        /// <summary>
        /// Cosntructor.
        /// </summary>
        /// <param name="value">Value.</param>
        public StreamNotificationEvent(string value)
        {
            this.Value = value;
        }

        /// <summary>
        /// Property for value.
        /// </summary>
        public string Value { set; get; }
    }

    /// <summary>
    /// Notification Stream Writer.
    /// </summary>
    public class NotificationStreamWriter : StreamWriter
    {
        public event EventHandler<StreamNotificationEvent> NotificationWritten;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="stream"></param>
        public NotificationStreamWriter(Stream stream) : base(stream)
        {

        }

        /// <summary>
        /// Write notification.
        /// </summary>
        /// <param name="value">Notification.</param>
        public override void Write(string value)
        {
            base.Write(value);
            NotificationWritten?.Invoke(this, new StreamNotificationEvent(value));
        }

        /// <summary>
        /// Write notification.
        /// </summary>
        /// <param name="value">Notification.</param>
        public override void Write(bool value)
        {
            base.Write(value);
            NotificationWritten?.Invoke(this, new StreamNotificationEvent(value.ToString()));
        }
    }
}
