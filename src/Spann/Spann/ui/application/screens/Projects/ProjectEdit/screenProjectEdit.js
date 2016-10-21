define([
  'BaseContentScreen',
  'App/screens/Projects/ProjectEdit/StateManager'
], function(BaseContentScreen, StateManager) {
  return function() {
    var screen = new BaseContentScreen("User",
    [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.Input,
            id: 'nameInput',
            hint: 'First Name',
            onChange: function (event) {
              event.target.screen.trigger('action', {action: 'updateName', data: {name: event.target.model.value}});
            }
          },
          {
            component: $ui.Input,
            id: 'passwordInput',
            hint: 'Password',
            type: 'password'
          }
        ]
      }
    ]);
    var manager = new StateManager(screen);

    screen.show = function(data) {
      console.log(data);
      var components = this.model;

      screen.render = function(state) {
        components.nameInput.value = state.name;
        components.passwordInput.value = state.password;
      }
      manager.initilize(data);
    };

    return screen;
  }
});
