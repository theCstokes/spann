define([
  'StateDialog',
  'App/screens/Develop/FileDialog/StateManager'
], function(StateDialog, StateManager) {
  return function() {
    var dialog = new StateDialog();
    dialog.saveEvent = "addNewFile";
    dialog.closeOnClickAway = false;
    dialog.size = $ui.Size.SMALL;
    dialog.content = [
      {
        component: $ui.Input,
        hint: 'File Name',
        onChange: function(data) {
          dialog.trigger('action', {action: 'attributeChange', data: {fileName: data.target.model.value}});
        }
      }
    ];

    var manager = new StateManager(dialog);

    dialog.registerEvent('show', function(data) {
      console.log(data);
      var components = dialog.model;
      manager.initialize(data);
    });

    return dialog;
  }
});
