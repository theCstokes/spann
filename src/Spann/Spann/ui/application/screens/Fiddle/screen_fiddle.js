define([
  'Screen',
  'App/screens/Fiddle/dockScreen_Output'
], function (Screen, dockScreen_Output) {
  return function () {
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
            icon: 'fa-play',
            onClick: function (event) {              
              var socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Fiddle");
              socket.onmessage = function (event) {
                var data = JSON.parse(event.data);
                console.log(data);
                $ui.push(dockScreen_Output, data);
              }
              socket.onopen = function (event) {
                console.log("fiddle connection open");
                var file = {
                  identity: 123, 
                  name: "test.py",
                  sourceCode: "print 123"
                };
                socket.send(JSON.stringify(file));
              }
            }
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

    // screen.show = function () {
    //   console.log(this);
    //   socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Console");
    //   socket.onmessage = function (event) {
    //     console.log(event);
    //     screen.model.ce.insertLine(event.data);
    //   }
    //   // socket.onopen = function (event) {
    //   //   socket.send("print 123");
    //   // }
    // }

    return screen;
  }
});
