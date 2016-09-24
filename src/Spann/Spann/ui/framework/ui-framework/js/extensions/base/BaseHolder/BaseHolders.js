function BaseHolder(parent, screen) {
  var object = $ui.BaseExtension(parent, screen);
  object.component.addClass('ui-holder');

  object._private.isContianer = false;
  object._private.containers = {};
  Object.defineProperty(object, 'addContainer', {
    value: function(name, item) {
      object._private.isContianer = true;
      if(item === undefined) {
        item = name;
        name = 'content';
      }
      // Add holder for building UI
      object._private.containers[name] = item;
    }
  });

  Object.defineProperty(object, 'isContianer', {
    get: function() {
      return object._private.isContianer;
    }
  });

  Object.defineProperty(object, 'containers', {
    get: function() {
        return object._private.containers;
    },
    enumerable: true
  });

  return object;
}

$ui.addExtension('BaseHolder', BaseHolder);
