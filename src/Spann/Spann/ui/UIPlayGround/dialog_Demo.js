define([
  'StateDialog'
], function(StateDialog) {
  return function() {
    var dialog = new StateDialog();
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
