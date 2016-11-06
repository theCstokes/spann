define([
  'Screen', 'App/screens/Home/dialog_Demo', 'App/screens/Home/dialog_Menu'
], function(Screen, dialog_Demo, dialog_Menu) {
  return function() {
    var socket;
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Panel,
        content: [
          {
            component: $ui.ColumnLayout,
            columns: [
              {
                component: $ui.Column,
                content: [
                  {
                    component: $ui.Input,
                    hint: "Value"
                  },
                  {
                    component: $ui.Button,
                    caption: "Value"
                  }
                ]
              },
              {
                component: $ui.Column,
                content: [
                  {
                    component: $ui.Button,
                    caption: "Value"
                  },
                  {
                    component: $ui.Input,
                    hint: "Value"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    screen.registerEvent('show', function() {
      console.log(this);
      socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Console");
      socket.onmessage = function (event) {
        console.log(event);
        screen.model.ce.insertLine(event.data);
      }
      // socket.onopen = function (event) {
      //   socket.send("print 123");
      // }
    });

    return screen;
  }
});