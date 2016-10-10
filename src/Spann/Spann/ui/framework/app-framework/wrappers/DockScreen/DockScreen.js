define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function StateDialog() {
    var object = new BaseWrapper($ui.DockScreen);
    object.level = $ui.ScreenLevelEnum.TOP;
    
    object.registerProperty("alignVertical");
    object.registerProperty("alignHorizontal");

    object.addComponentContainer('content', 'content', function(data) {
      return [{
        component: $ui.Panel,
        id: "dialogPanel",
        header: [
          {
            component: $ui.Label,
            caption: "New File"
          }
        ],
        content: data
      }]
    });

    Object.defineProperty(object, 'isStateControlled', {
      get: function() {
        return this.hasOwnProperty('stateManager');
      }
    });

    return object;
  }

  return StateDialog
});
