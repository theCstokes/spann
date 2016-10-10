define([
  'Screen', 'StateDialog'
], function(Screen, StateDialog) {
  return function() {
    var socket;
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Panel,
        header: [
          {
            component: $ui.Label,
            caption: "Editor"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-floppy-o',
            onClick: function() {
              console.log(123);
              var dialog = new StateDialog();
              $ui.push(dialog);
            }
          }
        ],
        content: [
          {
            component: $ui.Console,
            id: 'ce',
            mode: $ui.EditorMode.PYTHON,
            onCommandRun: function (command) {
              socket.send(command);
            }
          }
          // {
          //   component: $ui.Button,
          //   onClick: function() {
          //     var socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Console");
          //     socket.onmessage = function (event) {
          //       // var data = JSON.parse(event.data);
          //       // var items = data.map(function(obj) {
          //       //   return {
          //       //     name: obj.data,
          //       //     type: "recived"
          //       //   }
          //       // });
          //       console.log(event);
          //     }
          //     socket.onopen = function (event) {
          //       socket.send("print 123");
          //     }
          //   }
          // }
        ]
      }
    ];

    screen.show = function() {
      console.log(this);
      socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Console");
      socket.onmessage = function (event) {
        console.log(event);
        screen.model.ce.insertLine(event.data);
      }
      // socket.onopen = function (event) {
      //   socket.send("print 123");
      // }
    }

    return screen;
  }
});
