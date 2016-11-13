define([
  'BaseContentScreen',
  'App/screens/Develop/projectTransform',
  'App/screens/Projects/ProjectDialog/projectDialog'
], function (BaseContentScreen, projectTransform, projectDialog) {
  return function () {
    var screen = new BaseContentScreen();
    screen.content = [
      {
        component: $ui.Panel,
        topDock: [
          {
            component: $ui.Label,
            id: "editorScreen"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function () {
              screen.editMode = true;
            }
          }
        ],
        content: [
          // {
          //   component: $ui.Tree,
          //   decorator: $ui.ListDecorators.MAXIMIZE_LIST,
          //   id: 'projectList',
          //   style: $ui.FileListItem
          // }
        ]
      }
    ];

    screen.registerEvent('show', function (args) {
      var components = this.model;
      this.render = function (state) {

      }
    });

    $ui.addEvent('initProjectScreen', function (data) {
      console.log("Save!!!");
    });

    return screen;
  }
});
