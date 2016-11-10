function Group(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-group');
  object.addContainer(object.component);

  Object.defineProperty(object.model, 'size', {
    set: function () {
      console.log('size');
      console.log(object.component);
      object.component.addClass('half');
    }
  });

  Object.defineProperty(object.model, 'backgroudImage', {
    set: function (value) {
      if(object._private.backgroudImage !== value) {
        object._private.backgroudImage = value;
        object.component.style.background = "url(" + value + ")";
        object.component.addClass('background-image');
      }
    }
  })

  return object;
}

$ui.addExtension('Group', Group);
