define([
  'Frame'
], function(Frame) {
  return function() {
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
            onClick: function(event) {
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
        content: [
          {
            component: $ui.Label,
            caption: "Spann"
          }
        ]
      }
    ];

    $ui.addEvent("initProject", function(data) {
      console.log(data);
    });

    return frame;
  }
});
