define([
  'PartitionScreen',
  'App/screens/Develop/StateManager',
  'App/screens/Develop/developTransform',
  'App/screens/Develop/FileDialog/fileDialog'
], function (PartitionScreen, StateManager, developTransform, fileDialog) {
  return function () {
    var screen = new PartitionScreen();
    screen.content = [
      {
        component: $ui.Panel,
        id: 'status',
        topDock: [
          {
            component: $ui.Label,
            id: 'projectLabel'
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function () {
              $ui.push(fileDialog);
            }
          }
        ],
        content: [
          {
            component: $ui.Tree,
            id: "fileTree",
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            style: $ui.FileListItem
          }
        ]
      }
    ];
    var manager = new StateManager(screen);

    screen.registerEvent('show', function (args) {
      var components = this.model;
      $ui.addEvent('addNewFile', function (data) {
        screen.trigger('action', {
          action: 'addFile',
          data: data
        });
        screen.trigger("saveRequest", {}, function (event) {
          // $ui.frame.reloadSelected();

          $ui.popTo($ui.frame);
          requirejs([
            'App/screens/Develop/screenDevelop'], function (screenDevelop) {
              $ui.push(screenDevelop, { projectId: screen.stateManager.getCurrentState().current.uid });
              console.log(screen);
            });

        });
        console.log('data', data, components);
      });
      screen.render = function (state) {
        components.projectLabel.caption = state.current.name;
        // Update modified.
        components.projectLabel.modified = (state.current.name !== state.original.name);
      }
      this.registerSelectionList(
        components.fileTree,
        API.PROJECT_API,
        function (data) {
          manager.initialize(data.items);
          return developTransform.uiTransform(data);
        },
        developTransform.dataTransform,
        {
          id: args.projectId
        }
      );
    });
    return screen;
  }
});
