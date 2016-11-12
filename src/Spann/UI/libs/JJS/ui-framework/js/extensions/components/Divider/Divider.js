function Divider(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-divider');

  return object;
}

$ui.addExtension('Divider', Divider);
