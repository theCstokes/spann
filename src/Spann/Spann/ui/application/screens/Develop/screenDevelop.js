define([
  'PartitionScreen',
  'App/screens/Develop/StateManager',
  'App/screens/Develop/developTransform'
], function(PartitionScreen, StateManager, developTransform) {
  return function() {
    var screen = new PartitionScreen();
    screen.content = [
      {
        component: $ui.Panel,
        id: 'status',
        topDock: [
          {
            component: $ui.Label,
            id: 'projectLabel'
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

    screen.registerEvent('show', function(args) {
      var components = this.model;
      screen.render = function(state) {
        components.projectLabel.caption = state.current.name;

        components.fileTree.addItems(state.current.files.map(function(item, idx) {
          return {
            name: item.name,
            selected: idx === 0,
            icon: "fa-code",
            target: "App/screens/Develop/screenDevelop"
            }
          }));
        // Update modified.
        components.projectLabel.modified = (state.current.name !== state.original.name);
      }
      this.registerSelectionList(
        components.fileTree,
        API.PROJECT_API,
        function(data) {
          console.log(data);
          var item = data.items;
          var project = {
            name: item.name,
            uid: item.identity,
            files: item.details.files
          };
          manager.initialize(project);
        },
        function(data) {
          console.log(data);
          var item = data.items;
          var project = {
            name: item.name,
            uid: item.identity,
            files: item.details.files
          };
          manager.initialize(project);
        },
        {
          id: args.projectId
        }
      );
    });
    return screen;
  }
});
