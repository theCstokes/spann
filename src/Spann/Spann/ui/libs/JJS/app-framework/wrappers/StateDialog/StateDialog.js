define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function StateDialog() {
    var object = new BaseWrapper($ui.Dialog);
    object.level = $ui.ScreenLevelEnum.BASE;
    object.blurSiblings = true;
    object.registerProperty("size");

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
                  var screen = event.target.screen;
                  if(screen.isStateControlled) {
                    var currentState = screen.stateManager.getCurrentState();
                    $ui.notifyEvent(object._private.saveEvent, currentState);
                  }
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

    object._private.saveEvent = "";
    Object.defineProperty(object, 'saveEvent', {
      set: function(value) {
        object._private.saveEvent = value;
      }
    });

    object.show = function() {
    }

    return object;
  }

  return StateDialog
});
