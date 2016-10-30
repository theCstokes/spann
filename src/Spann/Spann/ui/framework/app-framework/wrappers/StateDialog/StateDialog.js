define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function StateDialog() {
    var object = new BaseWrapper($ui.Dialog);
    object.level = $ui.ScreenLevelEnum.BASE;
    object.blurSiblings = true;

    object.addComponentContainer('content', 'content', function(data) {
      return [{
        component: $ui.Panel,
        id: "dialogPanel",
        topDock: [
          {
            component: $ui.Label,
            caption: "New File"
          }
        ],
        bottomDock: [
          {
            component: $ui.Flow,
            rightToLeft: true,
            content: [
              {
                component: $ui.Button,
                caption: 'Save',
                icon: 'fa-check',
                onClick: function(event) {
                  console.log(event);
                  event.target.screen.trigger("saveRequest");
                  // $ui.frame.reloadSelected();
                  $ui.pop();
                }
              },
              {
                component: $ui.Button,
                caption: "Cancel",
                icon: 'fa-times',
                onClick: function(event) {
                  console.log(event);
                  // $ui.frame.reloadSelected();
                  $ui.pop();
                }
              }
            ]
          }
        ],
        content: data
      }]
    });

    Object.defineProperty(object, 'isStateControlled', {
      get: function() {
        return this.hasOwnProperty('stateManager');
      }
    });

    object.show = function() {
    }

    return object;
  }

  return StateDialog
});
