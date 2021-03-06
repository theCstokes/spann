define([
  'PartitionScreen',
  'App/screens/Projects/projectTransform',
  'App/screens/Projects/ProjectDialog/projectDialog',
  'App/screens/Common/ModifiedCloseDialog/modifiedCloseDialog'
], function(PartitionScreen, projectTransform, projectDialog, modifiedCloseDialog) {
  return function() {
    var screen = new PartitionScreen();
    screen.editTarget = "App/screens/Projects/ProjectEdit/screenProjectEdit";
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
              screen.editMode = true;
            }
          }
        ],
        content: [
          {
            component: $ui.Tree,
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            id: 'projectList',
            style: $ui.FileListItem
          }
        ]
      }
    ];

    screen.registerEvent('show', function(args) {
      var components = this.model;

      this.registerSelectionList(
        components.projectList,
        API.ALL_PROJECT_API,
        projectTransform.uiTransform,
        projectTransform.dataTransform);
      this.render = function(state) {

      }
    });

    $ui.addEvent('addNewProject', function(data) {
      console.log("Save!!!");
    });

    screen.onModifiedClose = function(target) {
      $ui.push(modifiedCloseDialog, target);
    }

    return screen;
  }
});
