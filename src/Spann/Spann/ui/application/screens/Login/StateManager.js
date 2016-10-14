define(['StateTreeManager'], function(StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

    var LoginModeEnum = Object.freeze({LOGIN: "login", CREATE: "create"});

    // ================================
    // Actions begin.
    function resetSate(state, data) {
      var default_state = {
        name: "",
        username: "",
        password: "",
        mode: LoginModeEnum.LOGIN,
        uid: 0
      };

      if(data === undefined) {
        return default_state;
      }

      var next_state = $utils.clone(default_state);

      if(data.hasOwnProperty('name')) {
        next_state.name = data.name;
      }

      if(data.hasOwnProperty('username')) {
        next_state.username = data.username;
      }

      if(data.hasOwnProperty('password')) {
        next_state.password = data.password;
      }

      if(data.hasOwnProperty('mode')) {
        next_state.mode = data.mode;
      }

      if(data.hasOwnProperty('uid')) {
        next_state.uid = data.uid;
      }
      return next_state;
    }

    function attributeChange(state, data) {
      console.log(data);
      var next_state = $utils.clone(state);
      if(data.hasOwnProperty('name')) {
        next_state.name = data.name;
      }

      if(data.hasOwnProperty('username')) {
        next_state.username = data.username;
      }

      if(data.hasOwnProperty('password')) {
        next_state.password = data.password;
      }
      return next_state;
    }

    function modeChange(state, data) {
      console.log(data);
      var next_state = $utils.clone(state);
      if(data.hasOwnProperty('mode')) {
        next_state.mode = data.mode;
      }
      return next_state;
    }

    function authorizationFail(state, data) {
      console.log(data);
      var next_state = $utils.clone(state);
      next_state.usernameError = "Possible Incorrect Username";
      next_state.username = "";
      next_state.passwordError = "Possible Incorrect Password";
      next_state.password = "";

      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state) {
      if(current_state.uid !== 0) {
        var differences = {};
        if(current_state.name !== original_state.name) differences.username = current_state.username;
        if(current_state.password !== original_state.password) differences.password = current_state.password;
        if(differences !== {}) differences.identity = current_state.uid;
        $data.send($data.SEND_TYPES.PUT, {api: "User"}, differences, function(event) {
          console.log(event);
        });
      }
    }

    tree.registerActions({
      resetSate: resetSate,
      attributeChange: attributeChange,
      modeChange: modeChange,
      authorizationFail: authorizationFail
    });

    tree.registerSaveRequest(saveRequest);

    return tree.create({
      LoginModeEnum: LoginModeEnum
    });
  }
  return StateManager
});
