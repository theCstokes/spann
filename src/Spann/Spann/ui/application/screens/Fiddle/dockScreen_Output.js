define([
  'DockScreen'
], function(DockScreen) {
  return function() {
    var dialog = new DockScreen();
    dialog.alignVertical = $ui.DockLocations.BOTTOM;
    dialog.alignHorizontal = $ui.DockLocations.RIGHT;
    dialog.content = [
      {
        component: $ui.Editor,
        mode: $ui.EditorMode.PYTHON,
        id: 'outputEditor'
      }
    ];

    dialog.show = function(data) {
      console.log(data);

      var components = this.model;
      // components.outputEditor.value = data;
    }

    return dialog;
  }
});
