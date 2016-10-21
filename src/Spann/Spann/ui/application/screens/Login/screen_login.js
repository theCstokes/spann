define([
  'FullScreen',
  'App/screens/Login/StateManager',
  'Encryption'
], function (Screen, StateManager, Encryption) {
  return function () {
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Input,
        id: 'nameInput',
        visible: false,
        hint: "Name",
        onChange: function (event) {
          event.target.screen.trigger('action', { action: 'attributeChange', data: { name: event.target.model.value } });
        }
      },
      {
        component: $ui.Input,
        id: 'usernameInput',
        hint: "Username",
        onChange: function (event) {
          event.target.screen.trigger('action', { action: 'attributeChange', data: { username: event.target.model.value } });
        }
      },
      {
        component: $ui.Input,
        id: 'passwordInput',
        hint: "Password",
        type: 'password',
        onChange: function (event) {
          event.target.screen.trigger('action', { action: 'attributeChange', data: { password: event.target.model.value } });
        }
      },
      {
        component: $ui.Flow,
        content: [
          {
            component: $ui.Button,
            caption: "Login",
            id: "loginButton",
            onClick: function (event) {
              var current_state = event.target.screen.stateManager.getCurrentState();
              // var saltyHash = Encryption.saltyHash(current_state.password);
              $data.get({
                api: "User"
              }, {
                  SearchHeader: {
                    items: [
                      {
                        property: 'username',
                        comparison: 'eq',
                        value: current_state.username
                      }
                    ]
                  }
                }, function (result) {
                  try {
                    if (result !== undefined) {
                      var user = result.items[0];
                      var saltyHash = Encryption.rehash(current_state.password, user.salt);
                      if (user.password === saltyHash.hash) {
                        login();
                      } else {
                        event.target.screen.trigger('action', { action: 'authorizationFail' });
                      }
                    } else {
                      event.target.screen.trigger('action', { action: 'authorizationFail' });
                    }
                  } catch (e) {
                    event.target.screen.trigger('action', { action: 'authorizationFail' });
                  }
                }
              );
            }
          },
          {
            component: $ui.Button,
            caption: 'New',
            id: "newUserButton",
            onClick: function (event) {
              event.target.screen.trigger('action', {
                action: 'modeChange',
                data: { mode: event.target.screen.stateManager.LoginModeEnum.CREATE }
              });
            }
          },
          {
            component: $ui.Button,
            visible: false,
            caption: $T('login.create'),
            id: "createButton",
            onClick: function (event) {
              var current_state = event.target.screen.stateManager.getCurrentState();
              var saltyHash = Encryption.saltyHash(current_state.password);
              $data.send($data.SEND_TYPES.POST, { api: "User/Create" },
                {
                  name: current_state.name,
                  username: current_state.username,
                  salt: saltyHash.salt,
                  password: saltyHash.hash
                }, function (event) {
                  if (event) {
                    login();
                  }
                });
            }
          }
        ]
      },
      {
        component: $ui.Flow,
        content: [
          {
            component: $ui.Button,
            caption: 'Fiddle',
            onClick: function (event) {
              fiddle();
            }
          }
        ]
      }
    ];

    var manager = new StateManager(screen);

    screen.registerEvent('show', function () {
      console.log(this);
      screen.uiObject.model.backgroundImage = '/ui/application/resources/login4.jpg';

      var components = screen.model;

      screen.render = function (state) {
        if (state.mode === manager.LoginModeEnum.LOGIN) {
          components.nameInput.visible = false;
          components.loginButton.visible = true;
          components.newUserButton.visible = true;
          components.createButton.visible = false;
        } else if (state.mode === manager.LoginModeEnum.CREATE) {
          components.nameInput.visible = true;
          components.nameInput.value = state.name;
          components.loginButton.visible = false;
          components.newUserButton.visible = false;
          components.createButton.visible = true;
        }
        components.usernameInput.value = state.username;
        components.passwordInput.value = state.password;
        components.usernameInput.error = state.usernameError;
        components.passwordInput.error = state.passwordError;
      }
      manager.initialize();

      screen.trigger('action', { action: 'attributeChange', data: { name: "admin", username: "admin", password: "admin" } });
    });

    function login() {
      $ui.pop();
      $ui.pop();
      requirejs([
        'App/selectionFrame',
        'App/screens/Home/screenConsole'], function (mainFrame, homeScreen) {
          $ui.frame = mainFrame;
          $ui.push(homeScreen);
        });
    }

    function fiddle() {
      $ui.pop();
      requirejs(['App/screens/Fiddle/screen_fiddle'], function (fiddleScreen) {
          // $ui.frame = fiddleFrame;
          $ui.push(fiddleScreen);
        });
    }

    return screen;
  }
});
