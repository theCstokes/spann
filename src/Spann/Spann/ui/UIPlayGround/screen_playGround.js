define([
  'Screen'
], function(Screen) {
  return function() {
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Input,
        id: 'usernameInput',
        hint: "Username",
        onChange: function (event) {
          event.target.screen.trigger('action', {action: 'attributeChange', data: {name: event.target.model.value}});
        }
      },
      {
        component: $ui.Input,
        id: 'passwordInput',
        hint: "Password",
        type: 'password',
        onChange: function (event) {
          event.target.screen.trigger('action', {action: 'attributeChange', data: {password: event.target.model.value}});
        }
      },
      {
        component: $ui.Flow,
        content: [
          {
            component: $ui.Button,
            caption: "Login",
            onClick: function(event) {
              var current_state =  event.target.screen.stateManager.getCurrentState();
              $data.send($data.SEND_TYPES.POST, {api: "User/Login"},
              {
                name: current_state.name,
                password: current_state.password
              }, function(response) {
                if(response) {
                  login();
                } else {
                  event.target.screen.trigger('action', {action: 'authorizationFail'});
                }
              });
            }
          },
          {
            component: $ui.Button,
            caption: 'Create',
            onClick: function(event) {
              var current_state =  event.target.screen.stateManager.getCurrentState();
              $data.send($data.SEND_TYPES.POST, {api: "User"},
              {
                name: current_state.name,
                password: current_state.password
              }, function(event) {
                if(event) {
                  login();
                }
              });
            }
          }
        ]
      },
      {
        component: $ui.Label,
        caption: "Hello"
      }
    ];

    screen.show = function() {
      console.log(this);
    }

    return screen;
  }
});
