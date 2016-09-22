function Frame(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-frame');

  var topBar = $ui.create(object.component);
  object.addContainer('topBar', topBar);
  topBar.addClass('topBar');

  var leftBar = $ui.create(object.component);
  object.addContainer('leftBar', leftBar);
  leftBar.addClass('leftBar');

  var holderContent = $ui.create(object.component);
  holderContent.addClass('holder');

  var mainContent = $ui.create(holderContent);
  object.addContainer('mainContent', mainContent);
  mainContent.addClass('mainContent');

  return object;
}
$ui.addExtension('Frame', Frame);
