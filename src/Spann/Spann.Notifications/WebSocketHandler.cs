using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;

namespace Spann.Notifications
{
    public class WebSocketHandler : IHttpHandler
    {
        private const int MAX_DATA_SIZE = 1024;

        public delegate void OnReceiveAction(Guid uid, string msg);
        public delegate void OnOpenAction(Guid uid);
        public delegate void OnCloseAction(Guid uid);

        private OnReceiveAction receiveCallback;
        private OnOpenAction openCallback;
        private OnCloseAction closeCallback;
        private AspNetWebSocket socket;
        private CancellationToken cancellationToken;
        private bool open;
        private readonly Guid uid;
        public WebSocketHandler(HttpContext context)
        {
            uid = Guid.NewGuid();
            this.ProcessRequest(context);
            open = false;
        }
        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
            {
                context.AcceptWebSocketRequest(WebSocketRequestHandler);
            }
        }

        public OnOpenAction OnOpen
        {
            set
            {
                this.openCallback = value;
            }
        }

        public OnReceiveAction OnReceive
        {
            set
            {
                this.receiveCallback = value;
            }
        }

        public OnCloseAction OnClose
        {
            set
            {
                this.closeCallback = value;
            }
        }

        public bool IsReusable { get { return true; } }

        public async Task WebSocketRequestHandler(AspNetWebSocketContext webSocketContext)
        {
            socket = webSocketContext.WebSocket as AspNetWebSocket;
            open = true;
            var receivedDataBuffer = new ArraySegment<Byte>(new Byte[MAX_DATA_SIZE]);
            cancellationToken = new CancellationToken();

            if(socket.State == WebSocketState.Open)
            {
                if (openCallback != null)
                {
                    openCallback.Invoke(uid);
                }
            }

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(receivedDataBuffer, CancellationToken.None);
                var messageString = Encoding.UTF8.GetString(receivedDataBuffer.Array, 0, result.Count);
                if(receiveCallback != null)
                {
                    receiveCallback.Invoke(uid, messageString);
                }
            }
            if(socket.State == WebSocketState.Closed)
            {
                NotifyClosed();
            }
        }

        public async Task Send(string msg)
        {
            if(socket != null && socket.State == WebSocketState.Open)
            {
                Byte[] bytes = System.Text.Encoding.UTF8.GetBytes(msg);

                await socket.SendAsync(new ArraySegment<byte>(bytes),
                  WebSocketMessageType.Text, true, cancellationToken);
            }
        }

        public void Close()
        {
            if (socket != null && socket.State == WebSocketState.Open)
            {
                socket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure,
                    "Closing...", CancellationToken.None).Wait();
            } else if(socket.State == WebSocketState.Closed)
            {
                NotifyClosed();
            }
        }

        private void NotifyClosed()
        {
            if(closeCallback != null && open == true)
            {
                closeCallback.Invoke(uid);
                open = false;
            }
        }
    }
}
