function Slider(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-slider');

  var dec = $ui.UIDecorators(object);
  dec.size(object.component, false);

  var leftArrow = $ui.create('div', object.component);
  leftArrow.addClass('move-left fa fa-chevron-left');

  var items = $ui.create('div', object.component);
  items.addClass('items');
  object.addContainer('items', items);

  var rightArrow = $ui.create('div', object.component);
  rightArrow.addClass('move-right fa fa-chevron-right');

  return object;

}

$ui.addExtension('Slider', Slider);