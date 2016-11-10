function PartitionScreen(parent, screen) {
  var object = $ui.BaseHolder(parent);
  object.component.addClass('ui-partition-screen', screen);

  var leftBar = $ui.create(object.component);
  object.addContainer('leftSide', leftBar);
  leftBar.addClass('left-side');

  var holderContent = $ui.create(object.component);
  holderContent.addClass('holder');

  var mainContent = $ui.create(holderContent);
  object.addContainer('rightSide', mainContent);
  mainContent.addClass('right-side');

  return object;
}
$ui.addExtension('PartitionScreen', PartitionScreen);
