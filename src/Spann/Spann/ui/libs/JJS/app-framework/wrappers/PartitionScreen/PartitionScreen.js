define([
  'Wrappers/base/BaseWrapper'
], function (BaseWrapper) {

  function PartitionScreen() {
    var object = new BaseWrapper($ui.PartitionScreen);
    var currentSelection = {};

    object.addComponentContainer('content', 'leftSide');
    object.addOwner('rightSide');

    object._private.editTarget = "";
    Object.defineProperty(object, 'editTarget', {
      get: function () {
        return object._private.editTarget;
      },
      set: function (value) {
        object._private.editTarget = value;
      }
    });

    object._private.editMode = false;
    Object.defineProperty(object, 'editMode', {
      get: function () {
        return object._private.editMode;
      },
      set: function (value) {
        if (object._private.editMode !== value) {
          object._private.editMode = value;
          if (value) {
            requirejs([object._private.editTarget], function (next_screen) {
              $ui.popTo(object);
              $ui.push(next_screen, {});
            });
          }
        }
      }
    });

    object._private.childScreen = undefined;
    object._private.selected = null;
    Object.defineProperty(object, 'registerSelectionList', {
      value: function (component, dataSource, uiTransform, dataTransform, requestData) {
        component.onSelection = function (node) {
          currentSelection = node;
        }
        component.dataPropertyTransform = dataTransform;
        $data.get(dataSource, requestData, function (object) {
          var items = uiTransform(object);
          component.items = items;
          component.items[0].select();
          console.log(component.selected);
        });
        component.onClick = function (event) {
          if (object._private.childScreen !== undefined) {
            if (object._private.childScreen.modified) {
              if (onModifiedClose !== undefined) {
                return onModifiedClose(event.target);
              }
            }
          }
          object._private.selected = event.target;
          requirejs([event.target.model.target], function (next_screen) {
            $ui.popTo(object);
            $ui.push(next_screen, event.target.model.data);
            object._private.childScreen = $ui.topScreen;
          });
        };
      }
    });

    Object.defineProperty(object, 'refreshContent', {
      value: function () {
        var selectedId = component.selected.uid;
        component.items.forEach(function (item) {
          if (item.uid === selectedId) {
            item.select();
          }
        });
      }
    });

    object._private.onModifiedClose = undefined;
    Object.defineProperty(object, 'onModifiedClose', {
      set: function (value) {
        onModifiedClose = value;
      },
      get: function () {
        return onModifiedClose;
      }
    });

    $ui.addEvent('continueChange', function (data) {
      data.model.selected = true;
      object._private.selected.model.selected = false;

      object._private.selected = data;
      requirejs([data.model.target], function (next_screen) {
        $ui.popTo(object);
        $ui.push(next_screen, data.model.data);
        object._private.childScreen = $ui.topScreen;
      });
    });

    $ui.addEvent('cancelChange', function (data) {
      data.model.selected = false;
      object._private.selected.model.selected = true;
    });

    return object;
  }

  return PartitionScreen
});
