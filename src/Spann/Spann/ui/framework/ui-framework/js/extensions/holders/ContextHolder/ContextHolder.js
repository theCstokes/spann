/**
 * Context Menu popup
 */
function ContextMenu(parent, Screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-contextHolder');

  var contextHolder = document.getElementsByClassName('ui-contextHolder')[0];
  var contextMenu = document.getElementsByClassName('ui-contextMenu')[0];

  // hide context menu when you click it
  contextMenu.addEventListener('click', function(event) {
    contextMenu.style.display = 'none';
    contextHolder.style.display = 'none';
  });

  return object;
}

$ui.addExtension('ContextMenu', ContextMenu);
