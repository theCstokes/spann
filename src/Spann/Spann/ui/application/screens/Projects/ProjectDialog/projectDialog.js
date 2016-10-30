define([
  'StateDialog'
], function(StateDialog) {
  return function() {
    var dialog = new StateDialog();
    dialog.content = [
      {
        component: $ui.Input,
        hint: 'ProjectName'
      }
    ];

    dialog.registerEvent('show', function(data) {
      console.log(data);

      var components = dialog.model;
      
    });

    return dialog;
  }
});
