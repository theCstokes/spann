function UserListItem(parent, screen) {
  var object = $ui.BaseListOrTreeItem(parent, screen);
  object.component.addClass('ui-user-list-item');

  object.content = $ui.create('div', object.component);
  object.content.addClass('content');

  var icon = $ui.create('i', object.content);
  icon.addClass('item-icon fa');

  var item = $ui.create('div', object.content);
  item.addClass('name');

  var dropArrow  = $ui.create('i', object.component);
  dropArrow.addClass('drop-arrow fa closed');
  dropArrow.onclick = function() {
    if(object._private.expanded) {
      object.colapseNode();
    } else {
      object.expandNode();
    }
  }

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

  Object.defineProperty(object.model, 'icon', {
    set: function(type) {
      icon.addClass(type);
    }
  });

  //Override  node properties
  // $ui.register(object, 'expandNode', function() {
  //   object._private.expanded = true;
  //   // dropArrow.replaceClass('fa-chevron-left close', 'fa-chevron-down');
  // });
  //
  // $ui.register(object, 'colapseNode', function() {
  //   object._private.expanded = false;
  //   // dropArrow.replaceClass('fa-chevron-down', 'fa-chevron-left closed');
  // });

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

$ui.addExtension('UserListItem', UserListItem);
