define([
  'DockScreen'
], function(DockScreen) {
  return function() {
    var dialog = new DockScreen();
    dialog.alignVertical = $ui.DockLocations.BOTTOM;
    dialog.alignHorizontal = $ui.DockLocations.RIGHT;
    dialog.content = [
      {
        component: $ui.Label,
        caption: "dialog"
      },
      {
        component: $ui.Flow,
        content: [
          {
            component: $ui.Button,
            caption: 'Save',
            onClick: function(event) {
              $ui.pop();
            }
          },
          {
            component: $ui.Button,
            caption: 'Save As',
            onClick: function(event) {
              $ui.pop();
            }
          }
        ]
      }
    ];

    return dialog;
  }
});
