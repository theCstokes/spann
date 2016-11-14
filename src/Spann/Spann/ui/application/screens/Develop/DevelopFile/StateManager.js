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
      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state) {
      if (current_state.uid !== 0) {
        var differences = {};
        if (current_state.name !== original_state.name) differences.name = current_state.name;
        if (differences !== {}) differences.identity = current_state.uid;
        $data.send($data.SEND_TYPES.PUT, { api: "Python/Project/{id}", id: current_state.uid }, differences, function (event) {
          console.log(event);
        });
      } else {
        $data.send($data.SEND_TYPES.POST,
          {
            api: "Python/Project"
          },
          {
            name: current_state.name
          },
          function (event) {
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
