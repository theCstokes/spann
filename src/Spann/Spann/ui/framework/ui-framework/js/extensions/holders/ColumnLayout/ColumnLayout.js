function ColumnLayout(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-column-layout');
  object.addContainer(object.component);
  
  return object;
}

$ui.addExtension('ColumnLayout', ColumnLayout);
