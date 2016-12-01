define([
  'Screen', 'App/screens/Home/dialog_Demo', 'App/screens/Home/dialog_Menu',  'BaseContentScreen'
], function(Screen, dialog_Demo, dialog_Menu, BaseContentScreen) {
  return function() {
    var socket;

    var screen = new BaseContentScreen();
    screen.content = [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.ColumnLayout,
            rightToLeft: false,
            columns: [
              {
                component: $ui.Column,
                width: '120px',
                content: [
                  {
                    component: $ui.Input,
                    hint: 'Old Password',
                    type: 'password',
                    id: 'old_pass'
                  },
                  {
                    component: $ui.Input,
                    hint: 'New Password',
                    type: 'password',
                    id: 'new_pass'
                  },
                  {
                    component: $ui.Input,
                    hint: 'Confirm New Password',
                    type: 'password',
                    id: 'new_pass_confirm'
                  }
                ]
              }
            ]
          }          
        ]
      }
    ];
    screen.topDock = [
      {
        component: $ui.Label,
        caption: "Account",
      }
    ]

    return screen;
  }
});
