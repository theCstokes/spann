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
              screen.trigger("saveRequest");
            }
          }
        ],
        content: [
          {
            component: $ui.Editor,
            mode: $ui.EditorMode.PYTHON,
            id: 'editor',
            onChange: function(event) {
              screen.trigger('action', {
                action: 'attributeChange',
                data: {
                  sourceCode: event.value
                }
              });
              $ui.notifyEvent("updateFie", screen.stateManager.getCurrentState().current);
            }
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
      $data.get(API.FILE_API, {
        id: args.uid
      },
      function(data) {
        console.log(data);
      });
      manager.initialize(args);
    });

    return screen;
  }
});
