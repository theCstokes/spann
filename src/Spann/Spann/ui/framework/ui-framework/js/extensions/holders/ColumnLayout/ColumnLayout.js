function ColumnLayout(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-column-layout');
  object.addContainer('columns', object.component);

  if (object.rightToLeft != undefined) {
    object._private.rightToLeft = object.rightToLeft;
  } else {
    object._private.rightToLeft = false;
  }
  renderLayoutOrder();
  Object.defineProperty(object.model, 'rightToLeft', {
    set: function (value) {
      if (object._private.rightToLeft !== value) {
        object._private.rightToLeft = value;
        renderLayoutOrder();
      }
    }
  });

  function renderLayoutOrder() {
    if (object._private.rightToLeft) {
      object.component.replaceClass('left-to-right', 'right-to-left');
    } else {
      object.component.replaceClass('right-to-left', 'left-to-right');
    }
  }

  return object;
}

$ui.addExtension('ColumnLayout', ColumnLayout);
