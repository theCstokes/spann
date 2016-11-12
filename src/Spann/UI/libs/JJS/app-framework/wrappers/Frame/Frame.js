define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function Frame() {
    var object = new BaseWrapper($ui.Frame);

    object.addComponentContainer('attachLeft', 'leftBar');
    object.addComponentContainer('attachTop', 'topBar');
    object.addOwner('mainContent');

    Object.defineProperty(object, 'selected', {
      set: function(value) {
        object._private.selected = value;
      },
      get: function() {
        return object._private.selected;
      }
    });

    Object.defineProperty(object, 'select', {
      value: function(target) {
        object.selected = target;
        requirejs([target], function(next_screen) {
          $ui.popTo(object);
          $ui.push(next_screen);
        });
      }
    });

    Object.defineProperty(object, 'reloadSelected', {
      value: function() {
        requirejs([object.selected], function(next_screen) {
          $ui.popTo(object);
          $ui.push(next_screen);
        });
      }
    });

    return object;
  }

  return Frame
});
