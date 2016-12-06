define(['StateTreeManager'], function (StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Develop_Edit_File_Manager', screen);

    // ================================
    // Actions begin.
    var defaultState = {
      name: "",
      uid: 0,
      files: []
    };

    function resetSate(state, data) {
      if (data === undefined) {
        return {
          current: $utils.clone(defaultState),
          original: $utils.clone(defaultState),
          static: Object.freeze({})
        }
      }

      var new_state = $utils.clone(defaultState);

      if (data.hasOwnProperty('name')) {
        new_state.name = data.name;
      }
      if (data.hasOwnProperty('uid')) {
        new_state.uid = data.uid;
      }
      if (data.hasOwnProperty('sourceCode')) {
        new_state.sourceCode = data.sourceCode;
      }

      return {
        current: $utils.clone(new_state),
        original: $utils.clone(new_state),
        static: Object.freeze({})
      };
    }

    function attributeChange(state, data) {
      var next_state = $utils.clone(state);
      if (data.hasOwnProperty('name')) {
        next_state.current.name = data.name;
      }
      if (data.hasOwnProperty('sourceCode')) {
        next_state.current.sourceCode = data.sourceCode;
      }
      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state, callback) {
      var differences = {
        name: current_state.name,
        id: current_state.uid,
        sourceCode: current_state.sourceCode
      };
      // if (current_state.sourceCode !== original_state.sourceCode) differences.sourceCode = current_state.sourceCode;
      $data.send($data.SEND_TYPES.PUT,
        {
          api: "Python/file/{id}",
          id: current_state.uid
        }, differences,
        function (event) {
          console.log(event);
          callback();
        });
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
