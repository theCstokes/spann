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
        $ui.pop();
    }
  }

  $ui.addEvent("ctxMove", function(location) {
    modal.style.top = location.top + "px";
    modal.style.left = location.left + "px";
  });

  object.show = function () {
    console.log('show');
    //this.component.style.height = "436px"; // this is wrong because it moves the background.
    //modal.style.left = "300px"
  }

  return object;
}

$ui.addExtension('ContextMenu', ContextMenu);
