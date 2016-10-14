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
            name: "Home",
            icon: "fa-home",
            selected: true,
            target: "App/screens/Home/homeScreen"
          },
          {
            name: "Add User",
            icon: "fa-user-plus",
            target: "App/screens/UserAdd/screen_NewUser"
          },
          {
            name: "Users",
            icon: "fa-users",
            target: "App/screens/Users/screen_Users"
          },
          {
            name: "GitHub",
            icon: "fa-github-alt"
          },
          {
            name: "Chat",
            icon: "fa-comments-o",
            target: "App/screens/Chat/screen_Chat"
          },
          {
            name: "Chat Send",
            icon: "fa-comments-o",
            target: "App/screens/ChatSend/screen_ChatSend"
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
