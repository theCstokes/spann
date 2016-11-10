define([
  'Wrappers/base/BaseWrapper'
], function (BaseWrapper) {

  function BaseContentScreen() {
    var object = new BaseWrapper($ui.Group);

    object.addComponentContainer('content', 'content', function (content) {
      var bottomActions = [
        {
          component: $ui.Button,
          caption: 'Save',
          icon: 'fa-times',
          onClick: function (event) {
            console.log(event);
            event.target.screen.trigger("saveRequest");
            $ui.frame.reloadSelected();
          }
        },
        {
          component: $ui.Button,
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
          header: [
            {
              component: $ui.Label,
              caption: object._private.name
            }
          ],
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

    return object;
  }

  return BaseContentScreen
});
