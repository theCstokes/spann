function ActionButton(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-action-button');

  var icon = $ui.create('div', object.component);
  icon.addClass('icon fa');

  if(object._private.icon != undefined) {
    icon.addClass(object._private.icon);
  } else {
    object._private.icon = "";
  }
  Object.defineProperty(object.model, "icon", {
    set: function(value) {
      if(object._private.icon != value) {
        icon.replaceClass(object._private.icon, value);
      }
    }
  });

  Object.defineProperty(object.model, "onClick", {
    set: function(callback) {
      object.component.onclick = callback;
    }
  });

  return object;
}

$ui.addExtension('ActionButton', ActionButton);
