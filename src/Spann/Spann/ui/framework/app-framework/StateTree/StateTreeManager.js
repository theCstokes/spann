define(function() {
  function StateTreeManager(id, screen) {
    var original_state = {};
    var current_state = {};
    var actions = {};
    var saveRequest;

    function initilize(data) {
      original_state = trigger("action", {action: "resetSate", data: data});
    }

    function registerActions(new_actions) {
      actions = new_actions;
    }

    function registerSaveRequest(callback) {
      saveRequest = callback;
    }

    function trigger(type, request) {
      if(type === "action") {
        var name = request.action;
        var data = request.data;
        var target = actions[name];
        if(target !== undefined) {
          current_state = target(current_state, data);
          if(screen.render !== undefined) {
            screen.render(current_state);
          }
          return current_state;
        } else {
          console.log("StateTreeManager " + id + " does contain action " + name);
        }
      }
      else if (type === "saveRequest") {
        if(saveRequest !== undefined) {
          var item = saveRequest(original_state, current_state);
        }
      }
    }

    function getCurrentState() {
      return current_state;
    }

    Object.defineProperty(screen, 'trigger', {
      value: trigger
    });

    Object.defineProperty(screen, 'stateManager', {
      get: function() {
        return {
          registerActions: registerActions,
          getCurrentState: getCurrentState
        }
      }
    });

    return {
      initilize: initilize,
      registerActions: registerActions,
      registerSaveRequest: registerSaveRequest,
      getCurrentState: getCurrentState
    }
  }

  return StateTreeManager;
})
