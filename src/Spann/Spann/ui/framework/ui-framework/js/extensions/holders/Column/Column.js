function Column(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-column');
  object.addContainer(object.component);

  Object.defineProperty(object.model, 'size', {
    set: function (value) {
      console.log('size', value);
      // console.log(object.component);
      // object.component.addClass('half');
    }
  });

  return object;
}

$ui.addExtension('Column', Column);
