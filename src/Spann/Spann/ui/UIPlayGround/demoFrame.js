define([
  'Frame'
], function (Frame) {
  return function () {
    var frame = new Frame();
    frame.attachLeft = [
      {
        component: $ui.Flow,
        rightToLeft: true,
        content: [
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function () {

            }
          }
        ]
      },
      {
        component: $ui.Divider
      },
      {
        component: $ui.List,
        style: $ui.FileListItem,
        items: [
          {
            name: "Account",
            icon: "fa-home",
            selected: false,
            target: 'PlayGroup/screen_Account'
          },
          {
            name: "Editor",
            icon: "fa-edit",
            selected: true,
            target: 'PlayGroup/screen_Editor'
          },
          {
            name: "Console",
            icon: "fa-code",
            selected: false,
            target: 'PlayGroup/screen_Console'
          }
        ],
        onClick: function (event) {
          var target = event.target.model.target;
          frame.select(target);
        }
      }
    ];

    frame.attachTop = [
      {
        component: $ui.Panel,
        showHeaderBar: false,
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
    ];

    return frame;
  }
});
