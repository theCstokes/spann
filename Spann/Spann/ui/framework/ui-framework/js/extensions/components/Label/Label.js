function Label(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);

  if(object._private.caption !== undefined) {
    renderCaption();
  }

  Object.defineProperty(object.model, 'caption', {
    set: function(value) {
      if(object._private.caption !== value) {
        object._private.caption = value;
        renderCaption();
      }
    },
    get: function() {

    }
  });

  function renderCaption() {
    object.component.textContent = object._private.caption;
  }

  return object;
}

$ui.addExtension('Label', Label);
