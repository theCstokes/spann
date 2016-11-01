define([
  'StateDialog',
  'App/screens/Projects/ProjectDialog/StateManager'
], function(StateDialog, StateManager) {
  return function() {
    var dialog = new StateDialog();
    dialog.saveEvent = "addNewProject";
    dialog.content = [
      {
        component: $ui.Input,
        hint: 'ProjectName'
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
