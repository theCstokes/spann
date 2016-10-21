define([
  'Screen',
  'App/screens/Fiddle/dockScreen_Output'
], function (Screen, dockScreen_Output) {
  return function () {
    var socket;
    var screen = new Screen();
    var dialogOpen = false;

    $ui.addEvent("closedOutput", function() {
      dialogOpen = false;
    });

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
              var screen = event.target.screen;
              var socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Fiddle");
              socket.onmessage = function (event) {
                data = event.data;
                if(data === undefined) return;

                if(!dialogOpen) {
                  $ui.push(dockScreen_Output, data);
                  dialogOpen = true;
                } else {
                  $ui.notifyEvent("updateOutput", data);
                }
              }
              socket.onopen = function (event) {
                console.log("fiddle connection open");
                var sourceCode = screen.model.editor.value;
                var file = {
                  identity: 123, 
                  name: "test.py",
                  sourceCode: sourceCode
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

    screen.registerEvent('show', function () {
      console.log();

      var components = screen.model;
      // components.editor.value = "abc";
    })

    return screen;
  }
});
