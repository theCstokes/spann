define(function() {
  function StateTreeManager(id, screen) {
    // var original_state = {};
    // var current_state = {};
    var state = {
      static: {},
      original: {},
      current: {}
    }
    var actions = {};
    var saveRequest;

    function initialize(data) {
      state = trigger("action", {action: "resetSate", data: data});
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
          state = target(state, data);
          if(screen.render !== undefined) {
            screen.render(state);
          }
          return state;
        } else {
          console.log("StateTreeManager " + id + " does contain action " + name);
        }
      }
      else if (type === "saveRequest") {
        if(saveRequest !== undefined) {
          var item = saveRequest(state.original, state.current);
        }
      }
    }

    function getCurrentState() {
      return state;
    }

    Object.defineProperty(screen, 'trigger', {
      value: trigger
    });

    function create(obj) {
      if(obj === undefined) {
        obj = {};
      }
      obj.initialize = initialize;
      obj.getCurrentState = getCurrentState;

      Object.defineProperty(screen, 'stateManager', {
        get: function() {
          return obj;
        }
      });

      return obj;
    }

    return {
      create: create,
      initialize: initialize,
      registerActions: registerActions,
      registerSaveRequest: registerSaveRequest,
      getCurrentState: getCurrentState
    }
  }

  return StateTreeManager;
})
