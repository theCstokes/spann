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
        component: $ui.Button,
      }
    ];

    return dialog;
  }
});
