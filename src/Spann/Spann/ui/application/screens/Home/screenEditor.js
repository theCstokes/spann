define([
  'Screen', 'App/screens/Home/dialog_Demo', 'App/screens/Home/dialog_Menu'
], function(Screen, dialog_Demo, dialog_Menu) {
  return function() {
    var socket;
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Panel,
        // showFooterBar: false,
        header: [
          {
            component: $ui.ActionButton,
            icon: 'fa-bars',
            onClick: function(event) {
              $ui.push(dialog_Menu);
            }
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-floppy-o',
            onClick: function(event) {
              console.log(123);
              $ui.push(dialog_Demo);
              // $data.send($data.SEND_TYPES.POST, {api: "File"}, {
              //   name: "test.py",
              //   sourceCode: event.target.screen.model.editor.value 
              // });
            }
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-question-circle-o',
          },
          {
            component: $ui.Label,
            caption: 'Editor :: %filename%',
            theme: 'x'
          }
        ],
        content: [
          {
            component: $ui.Editor,
            mode: $ui.EditorMode.PYTHON,
            id: 'editor'
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
