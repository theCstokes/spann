define([
  'Frame'
], function(Frame) {
  return function() {
    var frame = new Frame();

    frame.attachTop = [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.Label,
            caption: "Python Fiddle"
          }
        ]
      }
    ];

    return frame;
  }
});
