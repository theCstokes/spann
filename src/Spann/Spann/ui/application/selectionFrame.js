define([
  'Frame'
], function(Frame) {
  return function() {
    var frame = new Frame();
    frame.attachLeft = [
      {
        component: $ui.Group,
        id: 'status',
        size: 'half',
        content: [
          {
            component: $ui.Label,
            value: "Chris Stokes"
          }
        ]
      },
      {
        component: $ui.List,
        style: $ui.NavigationListItem,
        items: [
          {
            name: "Account",
            icon: "fa-cog",
            target: "App/screens/Home/screenAccount"
          },
          {
            name: "Editor",
            icon: "fa-edit",
            target: "App/screens/Home/screenEditor"
          },
          {
            name: "Console",
            icon: "fa-code",
            target: "App/screens/Home/screenConsole"
          }
        ],
        onClick: function(event) {
          var target = event.target.model.target;
          frame.select(target);
        }
      }
    ];

    frame.attachTop = [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.Label,
            value: "Chris Stokes"
          }
        ]
      }
    ];

    return frame;
  }
});
