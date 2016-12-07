define(function () {
  function DataSocket(api) {
    var object = {};
    var socket;

    var onOpen = undefined;
    Object.defineProperty(object, 'onOpen', {
      get: function () {
        return onOpen;
      },
      set: function (value) {
        onOpen = value;
      }
    });

    var onMessage = undefined;
    Object.defineProperty(object, 'onMessage', {
      get: function () {
        return onMessage;
      },
      set: function (value) {
        onMessage = value;
      }
    });

    var isOpen = false;
    Object.defineProperty(object, 'isOpen', {
      get: function() {
        return isOpen;
      }
    });

    function start() {
      socket = new WebSocket("ws://" +
        location.host + "/api/v1/" + api.api);

      socket.onmessage = function (event) {
        if (onMessage !== undefined) {
          onMessage(event);
        }
      };

      socket.onopen = function (event) {
        isOpen = true;
        if (onOpen !== undefined) {
          onOpen(event);
        }
      };
    }

    function send(obj) {
      if (socket !== undefined) {
        socket.send(JSON.stringify(obj));
      }
    }

    object.start = start;
    object.send = send;
    return object;
  }

  return DataSocket;
});