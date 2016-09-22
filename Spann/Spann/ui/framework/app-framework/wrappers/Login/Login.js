define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function Screen() {
    var object = new BaseWrapper($ui.Login);

    object.addComponentContainer('content', 'content');

    Object.defineProperty(object, 'isStateControlled', {
      get: function() {
        return this.hasOwnProperty('stateManager');
      }
    });

    return object;
  }

  return Screen
});
