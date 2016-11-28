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

      $ui.addEvent("refreshFile", function () {
        manager.initialize(args);
      });

      components.fileNameLabel.caption = args.name;
      this.render = function (state) {
        var d = new Date();
        console.log("render right", d.getTime());
        components.editor.value = state.current.sourceCode;

        if(state.current.sourceCode !== state.original.sourceCode) {
          components.fileNameLabel.caption = state.current.name + "*";
        } else {
          components.fileNameLabel.caption = state.current.name;
        }
      }
      manager.initialize(args);
    });

    return screen;
  }
});
