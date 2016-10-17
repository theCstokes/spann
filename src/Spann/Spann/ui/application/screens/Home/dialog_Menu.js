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
        caption: "Menu"
      },
      {
        component: $ui.Flow,
        content: [
          {
            component: $ui.Button,
            caption: 'Option 1',
            onClick: function(event) {
              $ui.pop();
            }
          },
          {
            component: $ui.Button,
            caption: 'Option 2',
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
