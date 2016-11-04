define([
  'BaseContentScreen',
  'App/screens/Projects/ProjectEdit/StateManager'
], function (BaseContentScreen, StateManager) {
  return function () {
    var screen = new BaseContentScreen();
    screen.content = [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.Input,
            id: 'projectInput',
            hint: 'Project Name',
            onChange: function (event) {
              event.target.screen.trigger('action', {
                action: 'attributeChange',
                data: {
                  name: event.target.model.value
                }
              });
            }
          }
        ]
      }
    ];
    screen.bottomActions = [
      {
        component: $ui.Button,
        caption: "Open",
        icon: 'fa-folder-open',
        onClick: function (event) {
          // console.log(event);
          // $ui.frame.reloadSelected();
        }
      }
    ]
    var manager = new StateManager(screen);

    screen.registerEvent('show', function (data) {
      console.log(data);
      var components = this.model;

      screen.render = function (state) {
        components.projectInput.value = state.current.name;
        components.projectInput.modified = (state.current.name !== state.original.name);
      }
      manager.initialize(data);
    });

    return screen;
  }
});
