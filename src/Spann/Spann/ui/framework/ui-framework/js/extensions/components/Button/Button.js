function Button(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-button');

  var dec = $ui.UIDecorators(object);
  dec.string('caption', object.component);
  dec.icon('icon', object.component);

  Object.defineProperty(object.model, "onClick", {
    set: function(callback) {
      object.component.onclick = function(event) {
          callback.call(object.model, {event: event, target: object});
      }
    }
  });

  return object;
}

$ui.addExtension('Button', Button);
