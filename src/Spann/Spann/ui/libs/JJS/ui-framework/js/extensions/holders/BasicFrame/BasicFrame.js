function BasicFrame(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-basic-frame');

  // var holderContent = $ui.create(object.component);
  // holderContent.addClass('holder');

  var mainContent = $ui.create(object.component);
  object.addContainer('mainContent', mainContent);
  mainContent.addClass('mainContent');

  return object;
}
$ui.addExtension('BasicFrame', BasicFrame);
