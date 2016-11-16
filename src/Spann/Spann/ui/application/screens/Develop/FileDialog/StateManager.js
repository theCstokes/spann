define(['StateTreeManager'], function (StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

    // ================================
    // Actions begin.
    var defaultState = {
      fileName: ""
    };
    function resetSate(state, data) {
      if (data === undefined) {
        return {
          current: $utils.clone(defaultState),
          original: $utils.clone(defaultState),
          static: Object.freeze({})
        }
      }

      var next_state = $utils.clone(state);

      if (data.hasOwnProperty('fileName')) {
        next_state.fileName = data.fileName;
      }
      return next_state;
    }

    function attributeChange(state, data) {
      var next_state = $utils.clone(state);
      if (data.hasOwnProperty('fileName')) {
        next_state.current.fileName = data.fileName;
      }
      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state) {
      if (current_state.uid !== 0) {
        var differences = {};
        if (current_state.name !== original_state.name) differences.name = current_state.name;
        if (current_state.password !== original_state.password) differences.password = current_state.password;
        if (differences !== {}) differences.identity = current_state.uid;
        $data.send($data.SEND_TYPES.PUT, { api: "User" }, differences, function (event) {
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
