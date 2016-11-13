function ContextMenu(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-context-menu');

  var modal = $ui.create(object.component);
  modal.addClass('modal');

  var content = $ui.create(modal);
  content.addClass('modal-content');
  object.addContainer(content);

  var span = $ui.create('span', content);
  span.addClass('close');

  window.onclick = function(event) {
    if (event.target === object.component) {
      $ui.notifyEvent("ctxPop");
      $ui.pop();
    }
  }

  $ui.addEvent("ctxMove", function(location) {
    modal.style.top = location.top + "px";
    modal.style.left = location.left + "px";
  });

  object.show = function () {
    console.log('show');
  }

  return object;
}

$ui.addExtension('ContextMenu', ContextMenu);
