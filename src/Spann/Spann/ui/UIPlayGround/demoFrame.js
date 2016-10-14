define([
  'Frame'
], function(Frame) {
  return function() {
    var frame = new Frame();
    frame.attachLeft = [
      {
        component: $ui.Flow,
        rightToLeft: true,
        content: [
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function() {
              
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
            name: "Editor",
            icon: "fa-home",
            selected: true,
            target: 'PlayGroup/screen_playGround'
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
        component: $ui.Panel,
        showHeaderBar: false,
        content: [
          {
            component: $ui.Label,
            caption: "Chris Stokes"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-play',
            onClick: function() {
              
            }
          }
        ]
      }
    ];

    return frame;
  }
});
