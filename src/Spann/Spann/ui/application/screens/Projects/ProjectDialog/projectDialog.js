define([
  'StateDialog'
], function(StateDialog) {
  return function() {
    var dialog = new StateDialog();
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
