function Dialog(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-dialog');

  var modal = $ui.create(object.component);
  modal.addClass('modal');

  var content = $ui.create(modal);
  content.addClass('modal-content');
  object.addContainer(content);

  var span = $ui.create('span', content);
  span.addClass('close');

  var dec = $ui.UIDecorators(object);
  dec.size(modal);

  window.onclick = function(event) {
    if (event.target === object.component) {
        $ui.pop();
    }
  }

  return object;
}

$ui.addExtension('Dialog', Dialog);
