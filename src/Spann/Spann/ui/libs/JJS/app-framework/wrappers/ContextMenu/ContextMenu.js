define([
  'Wrappers/base/BaseWrapper'
], function (BaseWrapper) {

  function StateDialog() {
    var object = new BaseWrapper($ui.ContextMenu);
    object.level = $ui.ScreenLevelEnum.BASE;
    object.blurSiblings = false;

    object.addComponentContainer('content', 'content', function (data) {
      return [{
        component: $ui.Panel,
        showTopDock: false,
        id: "dialogPanel",
        content: [
          {
            component: $ui.List,
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            style: $ui.FileListItem,
            items: [
              {
                name: "Copy"
                // selected: true,
                // icon: "fa-home"
              },
              {
                name: "Cut"
                // icon: "fa-cog",
              },
              {
                name: "Past"
                // icon: "fa-edit"
              }
            ],
            onClick: function (event) {
              var target = event.target.model.target;
              frame.select(target);
            }
          }
        ]
      }]
    });

    Object.defineProperty(object, 'isStateControlled', {
      get: function () {
        return this.hasOwnProperty('stateManager');
      }
    });

    object.show = function () {
    }

    return object;
  }

  return StateDialog
});
