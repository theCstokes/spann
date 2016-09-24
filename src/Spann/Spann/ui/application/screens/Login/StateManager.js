define(['StateTreeManager'], function(StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

    // ================================
    // Actions begin.
    function resetSate(state, data) {
      if(data === undefined) {
        return {
          name: "",
          password: "",
          uid: 0
        }
      }

      var next_state = $utils.clone(state);

      if(data.hasOwnProperty('username')) {
        next_state.name = data.name;
      }
      if(data.hasOwnProperty('password')) {
        next_state.password = data.password;
      }
      return next_state;
    }

    function attributeChange(state, data) {
      console.log(data);
      var next_state = $utils.clone(state);
      if(data.hasOwnProperty('name')) {
        next_state.name = data.name;
      }
      if(data.hasOwnProperty('password')) {
        next_state.password = data.password;
      }
      return next_state;
    }

    function authorizationFail(state, data) {
      console.log(data);
      var next_state = $utils.clone(state);
      next_state.usernameError = "Posible Incorect Username";
      next_state.name = "";
      next_state.passwordError = "Posible Incorect Password";
      next_state.password = "";

      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state) {
      if(current_state.uid !== 0) {
        var differences = {};
        if(current_state.name !== original_state.name) differences.name = current_state.name;
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
      authorizationFail: authorizationFail
    });

    tree.registerSaveRequest(saveRequest);

    return tree;
  }
  return StateManager
});
