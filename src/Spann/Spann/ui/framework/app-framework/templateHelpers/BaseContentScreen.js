define([
  'Screen',
  'App/screens/UserAdd/StateManager'
], function(Screen, StateManager) {
  function BaseContentScreen(caption, content) {
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Panel,
        id: "NewUserPanel",
        header: [
          {
            component: $ui.Label,
            caption: caption
          }
        ],
        content: content,
        bottomDock: [
          {
            component: $ui.Flow,
            rightToLeft: true,
            content: [
              {
                component: $ui.Button,
                caption: 'Save',
                icon: 'fa-times',
                onClick: function(event) {
                  console.log(event);
                  event.target.screen.trigger("saveRequest");
                  $ui.frame.reloadSelected();
                }
              },
              {
                component: $ui.Button,
                caption: "Cancel",
                icon: 'fa-file',
                onClick: function(event) {
                  console.log(event);
                  $ui.frame.reloadSelected();
                }
              }
            ]
          }
        ]
      }
    ];

    return screen;
  }

  return BaseContentScreen
});
