define([
  'Frame'
], function (Frame, StateManager, developTransform) {
  return function () {
    var frame = new Frame();

    frame.attachTop = [
      {
        component: $ui.Panel,
        showTopDock: false,
        bottomDock: [
          {
            component: $ui.ColumnLayout,
            rightToLeft: true,
            columns: [
              {
                component: $ui.Column,
                width: $ui.ColumnWidth.EIGHTY_FIVE,
                content: [
                  {
                    component: $ui.Slider,
                    items: [
                      {
                        component: $ui.FileListItem,
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        name: "Console"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    // var manager = new StateManager(frame);

    // frame.registerEvent('show', function (args) {
    //   var components = this.model;

    //   frame.render = function (state) {
    //     components.projectLabel.caption = state.current.name;

    //     components.fileTree.addItems(state.current.files.map(function (item, idx) {
    //       return {
    //         name: item.name,
    //         selected: idx === 0,
    //         icon: "fa-code",
    //         target: "App/screens/Develop/screenDevelop"
    //       }
    //     }));

    //     // Update modified.
    //     components.projectLabel.modified = (state.current.name !== state.original.name);
    //   }

    //   $data.get(API.PROJECT_API,
    //     {
    //       id: args.projectId
    //     },
    //     function (data) {
    //       console.log(data);
    //       var item = data.items;
    //       var project = {
    //         name: item.name,
    //         uid: item.identity,
    //         files: item.details.files
    //       };
    //       manager.initialize(project);
    //     });
    // });

    return frame;
  }
});
