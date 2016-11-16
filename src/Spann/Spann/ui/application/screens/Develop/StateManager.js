define(['StateTreeManager'], function (StateTreeManager) {
  function StateManager(screen) {
    var tree = new StateTreeManager('Users_State_Manager', screen);

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
      if (data.hasOwnProperty('identity')) {
        new_state.uid = data.identity;
      }
      if (data.hasOwnProperty('files')) {
        new_state.files = data.files;
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

    function addFile(state, data) {
      var next_state = $utils.clone(state);
      next_state.current.files.push({
        name: data.current.fileName
      });
      return next_state;
    }
    // Actions end.
    // ================================


    function saveRequest(original_state, current_state, callback) {
      var differences = {
        details: {
          files: []
        }
      };
      differences.identity = current_state.uid;
      current_state.files.forEach(function (item) {
        var file = {};
        if (!item.hasOwnProperty('uid') || item.uid === 0) {
          file.name = item.name;
          file.sourceCode = "";
          file.patchType = "create";
          file.patchClientId = "1";
        }
        differences.details.files.push(file);
      });
      $data.send($data.SEND_TYPES.PATCH,
        {
          api: "Python/Project"
        }, differences, function (event) {
          console.log(event);
          callback(event);
        });
      // if (current_state.uid !== 0) {
      //   var differences = {};
      //   if (current_state.name !== original_state.name) differences.name = current_state.name;
      //   if (differences !== {}) differences.identity = current_state.uid;
      //   $data.send($data.SEND_TYPES.PUT, { api: "Python/Project/{id}", id: current_state.uid }, differences, function (event) {
      //     console.log(event);
      //   });
      // } else {
      //   $data.send($data.SEND_TYPES.POST,
      //     {
      //       api: "Python/Project"
      //     },
      //     {
      //       name: current_state.name
      //     },
      //     function (event) {
      //       console.log(event);
      //     });
      // }
    }

    tree.registerActions({
      resetSate: resetSate,
      attributeChange: attributeChange,
      addFile: addFile
    });

    tree.registerSaveRequest(saveRequest);

    return tree.create();
  }
  return StateManager
});
