define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {
  return function () {
    var target = undefined;
    var dialog = new BaseWrapper($ui.Dialog);
    dialog.level = $ui.ScreenLevelEnum.BASE;
    dialog.blurSiblings = true;
    dialog.registerProperty("size");
    dialog.registerProperty("closeOnClickAway");
    dialog.addComponentContainer('content', 'content');


    // dialog.saveEvent = "addNewFile";
    dialog.closeOnClickAway = true;
    dialog.size = $ui.Size.SMALL;
    dialog.content = [
      {
        component: $ui.Panel,
        id: "dialogPanel",
        topDock: [
          {
            component: $ui.Label,
            caption: "Continue"
          }
        ],
        bottomDock: [
          {
            component: $ui.Flow,
            rightToLeft: true,
            content: [
              {
                component: $ui.Button,
                caption: 'Continue',
                icon: 'fa-check',
                onClick: function (event) {
                  console.log(event);
                  var screen = event.target.screen;
                  $ui.notifyEvent("continueChange", target);
                  $ui.pop();
                }
              },
              {
                component: $ui.Button,
                caption: "Cancel",
                icon: 'fa-times',
                onClick: function (event) {
                  console.log(event);
                  $ui.notifyEvent("cancelChange", target);
                  $ui.pop();
                }
              }
            ]
          }
        ],
        content: [
          {
            component: $ui.Label
          },
          {
            component: $ui.Label,
            icon: "fa-times",
            overrideHTML: "<b> <center> There are changes to this page. You will loose all changes if you continue. </center> </b>",
          }
        ]
      }
    ];

    // var manager = new StateManager(dialog);

    dialog.registerEvent('show', function (data) {
      console.log(data);
      var components = dialog.model;
      target = data;
      // manager.initialize(data);
    });

    return dialog;
  }
});
