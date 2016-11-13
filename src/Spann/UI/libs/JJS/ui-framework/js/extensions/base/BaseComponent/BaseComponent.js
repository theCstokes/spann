function BaseComponent(parent, screen) {
  var object = $ui.BaseExtension(parent, screen);
  object.component.addClass('ui-base-component');

  Object.defineProperty(object, 'noMargin', {
    set: function (value) {
      if(object._private.noMargin !== value) {
        object._private.noMargin = value;
        renderMargin();
      }
    },
    get: function() {
      return object._private.noMargin;
    }
  });

  function renderMargin() {
    if(!object._private.noMargin) {
      object.component.addClass('ui-base-component');
    } else {
      object.component.removeClass('ui-base-component');
    }
  }

  return object;
}

$ui.addExtension('BaseComponent', BaseComponent);
