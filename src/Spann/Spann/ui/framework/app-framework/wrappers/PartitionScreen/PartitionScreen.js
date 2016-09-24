define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function PartitionScreen() {
    var object = new BaseWrapper($ui.PartitionScreen);
    var currentSelection = {};

    object.addComponentContainer('content', 'leftSide');
    object.addOwner('rightSide');

    // Object.defineProperty(object, 'registerSelectionList', {
    //   value: function(component, dataPropteryTransform) {
    //     component.dataPropteryTransform = dataPropteryTransform;
    //     component.onClick = function(event) {
    //       requirejs([event.target.model.target], function(next_screen) {
    //         $ui.popTo(object);
    //         $ui.push(next_screen, event.target.model.data);
    //       });
    //     };
    //   }
    // });

    Object.defineProperty(object, 'registerSelectionList', {
      value: function(component, dataSource, uiTransform, dataTransform) {
        component.onSelection = function (node) {
          currentSelection = node;
        }
        component.dataPropteryTransform = dataTransform;
        $data.get(dataSource, function(object) {
          var items = uiTransform(object);
          component.items = items;
          component.items[0].select();
          console.log(component.selected);
        });
        component.onClick = function(event) {
          requirejs([event.target.model.target], function(next_screen) {
            $ui.popTo(object);
            // next_screen.setManager(object);
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
