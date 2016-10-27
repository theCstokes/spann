define([
  'PartitionScreen',
  'App/screens/Projects/projectTransform',
  'App/screens/Projects/ProjectDialog/projectDialog'
], function(PartitionScreen, projectTransform, projectDialog) {
  return function() {
    var screen = new PartitionScreen();
    screen.content = [
      {
        component: $ui.Panel,
        topDock: [
          {
            component: $ui.Label,
            caption: "Projects"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function() {
              $ui.push(projectDialog);
            }
          }
        ],
        content: [
          {
            component: $ui.Tree,
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            id: 'projectList',
            style: $ui.FileListItem
            // items: [
            //   {
            //     elementType: $ui.TreeElementType.ITEM,
            //     name: "Home",
            //     selected: true,
            //     icon: "fa-home"
            //   }
            // ]
          }
        ]
      }
    ];

    screen.registerEvent('show', function(args) {
      var components = this.model;

      this.registerSelectionList(
        components.projectList,
        $data.sources.PROJECT_API,
        projectTransform.uiTransform,
        projectTransform.dataTransform);
      this.render = function(state) {

      }
    });

    return screen;
  }
});
