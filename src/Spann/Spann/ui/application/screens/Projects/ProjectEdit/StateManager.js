define(['StateTreeManager'], function(StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

    // ================================
    // Actions begin.
    function resetSate(state, data) {
      if(data === undefined) {
        return {
          name: "",
          uid: 0
        }
      }

      var next_state = $utils.clone(state);

      if(data.hasOwnProperty('name')) {
        next_state.name = data.name;
      }
      if(data.hasOwnProperty('uid')) {
        next_state.uid = data.uid;
      }
      return next_state;
    }

    function attributeChange(state, data) {
      var next_state = $utils.clone(state);
      if(data.hasOwnProperty('name')) {
        next_state.name = data.name;
      }
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
      attributeChange: attributeChange
    });

    tree.registerSaveRequest(saveRequest);

    return tree.create();
  }
  return StateManager
});
