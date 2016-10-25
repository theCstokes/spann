define([
  'DockScreen'
], function(StateDialog) {
  return function() {
    var dialog = new StateDialog();
    dialog.alignVertical = $ui.DockLocations.BOTTOM;
    dialog.alignHorizontal = $ui.DockLocations.RIGHT;
    dialog.content = [
      {
        component: $ui.Editor,
        mode: $ui.EditorMode.PYTHON,
        id: 'outputEditor'
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

    $ui.addEvent("updateOutput", function(value) {
      dialog.model.outputEditor.value = String(data);
    });

    return dialog;
  }
});
