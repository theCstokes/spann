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
            component: $ui.Label,
            caption: 'Account',
            theme: 'x'
          }
        ],
        content: [
          {
            component: $ui.Flow,
            content: [
              {
                component: $ui.Label,
                caption: 'Old password',
                theme: 'x'
              },
              {
                component: $ui.Input,
                hint: 'password',
                id: 'old_pass'
              }
            ]
          },
          {
            component: $ui.Flow,
            content: [
              {
                component: $ui.Label,
                caption: 'New password',
                theme: 'x'
              },
              {
                component: $ui.Input,
                hint: 'password',
                id: 'new_pass'
              }
            ]
          },
          {
            component: $ui.Flow,
            content: [
              {
                component: $ui.Label,
                caption: 'New password',
                theme: 'x'
              },
              {
                component: $ui.Input,
                hint: 'password',
                id: 'new_pass_confirm'
              }
            ]
          },
          {
            component: $ui.Button,
            caption: 'Update',
            onClick: function(event) {
              console.log('update setting');
            }
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
