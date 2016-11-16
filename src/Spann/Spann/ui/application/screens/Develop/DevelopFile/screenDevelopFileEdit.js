define([
  'Screen',
  'App/screens/Develop/DevelopFile/StateManager'
], function (Screen, StateManager) {
  return function () {
    var screen = new Screen();
    screen.content = [
      {
        component: $ui.Panel,
        topDock: [
          {
            component: $ui.Label,
            id: "fileNameLabel"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-floppy-o',
            onClick: function () {
              screen.editMode = true;
            }
          }
        ],
        content: [
          {
            component: $ui.Editor,
            mode: $ui.EditorMode.PYTHON,
            id: 'editor'
          }
        ]
      }
    ];
    var manager = new StateManager(screen);

    screen.registerEvent('show', function (args) {
      var components = this.model;
      this.render = function (state) {
        components.editor.value = state.current.sourceCode;
      }
      manager.initialize(args);
    });

    return screen;
  }
});
