define([
  'Login',
  'App/screens/Login/StateManager'
], function(Login, StateManager) {
  return function() {
    var screen = new Login();

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
      }
    ];

    var manager = new StateManager(screen);

    screen.show = function() {
      console.log(this);
      this.uiObject.model.backgroudImage = '/ui/application/resources/login3.jpg';

      var components = this.model;

      screen.render = function(state) {
        components.usernameInput.value = state.name;
        components.passwordInput.value = state.password;
        components.usernameInput.error = state.usernameError;
        components.passwordInput.error = state.passwordError;
      }
      manager.initilize();
    }

    function login() {
      $ui.pop();
      requirejs([
        'App/mainFrame',
        'App/screens/Home/homeScreen'], function(mainFrame, homeScreen) {
          $ui.frame = mainFrame;
          $ui.push(homeScreen);
        });
    }

    return screen;
  }
});
