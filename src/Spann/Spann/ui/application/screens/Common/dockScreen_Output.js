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
        id: 'outputEditor',
        readOnly: true
      }
    ];

    dialog.registerEvent('show', function(data) {
      console.log(data);

      var components = dialog.model;
      components.outputEditor.value = String(data);
    });

    dialog.onClose = function() {
      $ui.notifyEvent("closedOutput");
    }
    
    dialog.registerEvent('remove', function() {
      $ui.notifyEvent("closedOutput");
    });

    $ui.addEvent("updateOutput", function(value) {
      dialog.model.outputEditor.value = String(data);
    });

    return dialog;
  }
});
