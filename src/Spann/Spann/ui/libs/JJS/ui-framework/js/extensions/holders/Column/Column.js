function Column(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-column');
  object.addContainer(object.component);

  object._private.width = "";
  Object.defineProperty(object.model, 'width', {
    set: function (value) {
      if(value !== object._private.width) {
        object._private.size = value;
        // renderSize();
        object.component.addClass(value);
      }
    }
  });

  // function renderSize() {
  //   var scale = object._private.size / 100;
  //   var width = object.component.parentElement.offsetWidth;
  //   object.component.style.width = (width * scale) + "px";
  // }

  // object.show = function () {
  //   renderSize();
  // }

  return object;
}

$ui.addExtension('Column', Column);
