define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function PartitionScreen() {
    var object = new BaseWrapper($ui.PartitionScreen);
    var currentSelection = {};

    object.addComponentContainer('content', 'leftSide');
    object.addOwner('rightSide'); 

    object._private.editMode = false;
    Object.defineProperty(object, 'editMode', {
      get: function() {
        return object._private.editMode;
      },
      set: function(value) {
        if(object._private.editMode !== value) {
          object._private.editMode = value;
          if(value) {
            requirejs([object._private.selected.model.target], function(next_screen) {
              $ui.popTo(object);
              $ui.push(next_screen, {});
            });
          }
        }
      }
    });

    object._private.selected = null;
    Object.defineProperty(object, 'registerSelectionList', {
      value: function(component, dataSource, uiTransform, dataTransform) {
        component.onSelection = function (node) {
          currentSelection = node;
        }
        component.dataPropertyTransform = dataTransform;
        $data.get(dataSource, function(object) {
          var items = uiTransform(object);
          component.items = items;
          component.items[0].select();
          console.log(component.selected);
        });
        component.onClick = function(event) {
          object._private.selected = event.target;
          requirejs([event.target.model.target], function(next_screen) {
            $ui.popTo(object);
            $ui.push(next_screen, event.target.model.data);
          });
        };
      }
    });

    Object.defineProperty(object, 'refreshContent', {
      value: function () {
        var selectedId = component.selected.uid;
        component.items.forEach(function (item) {
          if(item.uid === selectedId) {
            item.select();
          }
        });
      }
    });

    return object;
  }

  return PartitionScreen
});
