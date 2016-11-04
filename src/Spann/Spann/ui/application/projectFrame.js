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

    $ui.addEvent("initProject", function(data) {
      console.log(data);
    });

    return frame;
  }
});
