function Flow(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-flow');
  object.addContainer(object.component);

  Object.defineProperty(object.model, 'size', {
    set: function () {
      console.log('size');
      console.log(object.component);
      object.component.addClass('half');
    }
  });

  if(object.rightToLeft != undefined) {
    object._private.rightToLeft = object.rightToLeft;
  } else {
    object._private.rightToLeft = false;
  }
  renderLayoutOrder();
  Object.defineProperty(object.model, 'rightToLeft', {
    set: function (value) {
      if(object._private.rightToLeft !== value) {
        object._private.rightToLeft = value;
        renderLayoutOrder();
      }
    }
  });
  function renderLayoutOrder() {
    if(object._private.rightToLeft) {
      object.component.replaceClass('left-to-right', 'right-to-left');
    } else {
      object.component.replaceClass('right-to-left', 'left-to-right');
    }
  }

  return object;
}

$ui.addExtension('Flow', Flow);
