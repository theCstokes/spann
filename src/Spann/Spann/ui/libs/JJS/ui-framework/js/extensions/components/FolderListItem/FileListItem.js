function FileListItem(panel, screen) {
  var object = $ui.BaseListOrTreeItem(panel, screen);
  object.noMargin = true;
  object.component.addClass('ui-file-list-item');

  object.content = $ui.create('div', object.component);
  object.content.addClass('content');

  var icon = $ui.create('i', object.content);
  icon.addClass('item-icon fa');

  var item = $ui.create('div', object.content);
  item.addClass('name');

  Object.defineProperty(object.model, 'name', {
    set: function(value) {
      if(object._private.name != value) {
        object._private.name = value;
        item.textContent = value;
      }
    },
    get: function() {
      return object._private.name;
    }
  });

  object._private.openIcon = undefined;
  Object.defineProperty(object.model, 'open-icon', {
    set: function(value) {
      icon.addClass(value);
      //icon.replaceClass(value);
    }
  });

  object._private.closedIcon = undefined;
  Object.defineProperty(object.model, 'closed-icon', {
    set: function(value) {
      icon.addClass(value);
      //icon.replaceClass(value);
    }
  });

  Object.defineProperty(object.model, 'target', {
    set: function(value) {
      object._private.target = value;
    },
    get: function() {
      return object._private.target;
    }
  })

  return object;
}

$ui.addExtension('FileListItem', FileListItem);
