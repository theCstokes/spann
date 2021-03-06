define(['StateTreeManager'], function(StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

    // ================================
    // Actions begin.
    var defaultState = {
      name: "",
      startFileName: "",
      uid: 0
     };
    function resetSate(state, data) {
      if(data === undefined) {
        return {
          current: $utils.clone(defaultState),
          original: $utils.clone(defaultState),
          static: Object.freeze({})
        }
      }

      var new_state = $utils.clone(defaultState);

      if(data.hasOwnProperty('name')) {
        new_state.name = data.name;
      }
      if(data.hasOwnProperty('startFileName')) {
        new_state.startFileName = data.startFileName;
      }
      if(data.hasOwnProperty('uid')) {
        new_state.uid = data.uid;
      }
      
      return {
          current: $utils.clone(new_state),
          original: $utils.clone(new_state),
          static: Object.freeze({})
        };
    }

    function attributeChange(state, data) {
      var next_state = $utils.clone(state);
      if(data.hasOwnProperty('name')) {
        next_state.current.name = data.name;
      }
      if(data.hasOwnProperty('startFileName')) {
        next_state.current.startFileName = data.startFileName;
      }
      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state, callback) {
      var differences = {
          name: current_state.name,
          startFileName: current_state.startFileName,
          id: current_state.uid
        };
      if(current_state.uid !== 0) {
        $data.send($data.SEND_TYPES.PUT, {api: "Python/Project/{id}", id: current_state.uid}, differences, function(event) {
          console.log(event);
          callback(event);
        });
      } else {
        $data.send($data.SEND_TYPES.POST, { api: "Python/Project" }, differences, 
        function(event) {
          console.log(event);
          callback(event);
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
