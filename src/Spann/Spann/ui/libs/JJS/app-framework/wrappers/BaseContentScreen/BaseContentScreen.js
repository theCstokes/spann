define([
  'Wrappers/base/BaseWrapper'
], function (BaseWrapper) {

  function BaseContentScreen() {
    var object = new BaseWrapper($ui.Group);

    object.addComponentContainer('content', 'content', function (content) {
      var bottomActions = [
        {
          component: $ui.Button,
          id: "saveButton",
          caption: 'Save',
          icon: 'fa-times',
          onClick: function (event) {
            console.log(event);
            event.target.screen.trigger("saveRequest", {}, function(event) {
              $ui.frame.reloadSelected();
            });
          }
        },
        {
          component: $ui.Button,
          id: "cancelButton",
          caption: "Cancel",
          icon: 'fa-file',
          onClick: function (event) {
            console.log(event);
            $ui.frame.reloadSelected();
          }
        }
      ];

      bottomActions = bottomActions.concat(object._private.bottomActions);
      return [
        {
          component: $ui.Panel,
          id: "NewUserPanel",
          topDock: object._private.topDock,
          content: content,
          bottomDock: [
            {
              component: $ui.Flow,
              rightToLeft: true,
              content: bottomActions
            }
          ]
        }
      ]
    });

    Object.defineProperty(object, 'isStateControlled', {
      get: function () {
        return this.hasOwnProperty('stateManager');
      }
    });

    object._private.name = "";
    Object.defineProperty(object, 'name', {
      set: function (name) {
        object._private.name = name;
      }
    });

    object._private.bottomActions = [];
    Object.defineProperty(object, 'bottomActions', {
      set: function (item) {
        object._private.bottomActions = item;
      }
    });

    object._private.topDock = [];
    Object.defineProperty(object, 'topDock', {
      set: function (item) {
        object._private.topDock = item;
      }
    });

    return object;
  }

  return BaseContentScreen
});
