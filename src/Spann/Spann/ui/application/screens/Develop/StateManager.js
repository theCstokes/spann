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
      if (data.hasOwnProperty('uid')) {
        new_state.uid = data.uid;
      }
      if (data.hasOwnProperty('files')) {
        new_state.files = data.files;
      }
      if (data.hasOwnProperty('startFileName')) {
        new_state.startFileName = data.startFileName;
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

    function updateFile(state, data)  {
      var next_state = $utils.clone(state);
      var result = next_state.current.files.find(function(item) {
        return item.uid === data.uid;
      });
      result.sourceCode = data.sourceCode;
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
        if (!item.hasOwnProperty('uid') || item.uid === 0) {
          var file = {};
          file.name = item.name;
          file.sourceCode = "";
          file.patchType = "create";
          file.patchClientId = "1";
          differences.details.files.push(file);
        }
      });
      $data.send($data.SEND_TYPES.PATCH,
        {
          api: "Python/Project"
        }, differences, function (event) {
          console.log(event);
          callback(event);
        });
    }

    tree.registerActions({
      resetSate: resetSate,
      attributeChange: attributeChange,
      addFile: addFile,
      updateFile: updateFile
    });

    tree.registerSaveRequest(saveRequest);

    return tree.create();
  }
  return StateManager
});
