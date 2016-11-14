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
        topDock: [
          {
            component: $ui.ActionButton,
            icon: 'fa-bars',
            onClick: function(event) {
              console.log(123);
              $ui.push(dialog_Menu);
            }
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-question-circle-o',
          },
          {
            component: $ui.Label,
            caption: 'Console',
          },
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
        ]
      }
    ];

    screen.registerEvent('show', function() {
      console.log(this);
      socket = new WebSocket("ws://" + location.host + "/api/v1/Python/Console");
      socket.onmessage = function (event) {
        if (!$utils.isNullOrWhitespace(event.data)) {
          console.log(event);
          screen.model.ce.insertLine(event.data);
        }
      }
      // socket.onopen = function (event) {
      //   socket.send("print 123");
      // }
    });

    return screen;
  }
});
