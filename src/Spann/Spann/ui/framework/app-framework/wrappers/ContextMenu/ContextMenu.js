define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function StateDialog() {
    var object = new BaseWrapper($ui.ContextMenu);
    object.level = $ui.ScreenLevelEnum.BASE;
    object.blurSiblings = false;

    object.addComponentContainer('content', 'content', function(data) {
      return [{
        component: $ui.Panel,
        showTopBar: true,
        id: "dialogPanel",
        topDock: [
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

    object.show = function() {
      console.log("show!!!!");
      //this.uiObject.component.offsetHeight
      // this.uiObject.component.style.height = 1000 + "px";
      // this.uiObject.component.style.width = 1000 + "px";

      // this.model.dialogPanel.component.style.height = 1000 + "px";
      // this.model.dialogPanel.component.style.width = 1000 + "px";

      // this.model.dialogPanel.component.style.top = this.uiObject.component.offsetTop + "px";
      // this.model.dialogPanel.component.style.left = this.uiObject.component.offsetLeft + "px";
      console.log("show!!!!");
    }

    return object;
  }

  return StateDialog
});
