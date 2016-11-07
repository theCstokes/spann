define([
  'Frame'
], function (Frame) {
  return function () {
    var frame = new Frame();
    frame.attachLeft = [
      {
        component: $ui.Panel,
        showTopDock: false,
        id: 'status',
        content: [
          {
            component: $ui.List,
            style: $ui.FileListItem,
            items: [
              {
                name: "Home",
                selected: true,
                icon: "fa-home",
                target: "App/screens/Home/screenHome"
              },
              {
                name: "Account",
                icon: "fa-cog",
                target: "App/screens/Account/screenAccount"
              },
              {
                name: "Editor",
                icon: "fa-edit",
                target: "App/screens/Home/screenEditor"
              },
              {
                name: "Console",
                icon: "fa-code",
                target: "App/screens/Console/screenConsole"
              },
              {
                name: "Projects",
                icon: "fa-object-group",
                target: "App/screens/Projects/screenProjects"
              }
            ],
            onClick: function (event) {
              var target = event.target.model.target;
              frame.select(target);
            }
          }
        ]
      }
    ];

    frame.attachTop = [
      {
        component: $ui.Panel,
        showTopDock: false,
        bottomDock: [
          {
            component: $ui.ColumnLayout,
            columns: [
              {
                component: $ui.Column,
                id: "selCol",
                size: 80,
                content: [
                  {
                    component: $ui.Slider,
                    items: [
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
                        name: "Console"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        content: [
          {
            component: $ui.ColumnLayout,
            columns: [
              {
                component: $ui.Column,
                id: "selCol",
                size: 80,
                content: [
                  {
                    component: $ui.Slider,
                    items: [
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
                        name: "Console"
                      },
                      {
                        component: $ui.FileListItem,
                        // icon: 'fa-plus',
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

    $ui.addEvent("initProject", function (data) {
      console.log(data);
    });

    return frame;
  }
});
