function BaseListOrTreeItem(panel, screen) {
  var object = $ui.BaseComponent(panel, screen);
  object.noMargin = true;
  object.component.addClass('ui-base-list-tree-item');
  object.content = object.component;

  object._private.expanded = false;
  Object.defineProperty(object.model, 'expand', {
    value: function() {
      if(object._private.expanded != false) {
        if(object.expandNode != undefined) {
          object.expandNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'colapse', {
    value: function() {
      if(object._private.expanded == false) {
        if(object.colapseNode != undefined) {
          object.colapseNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'clicked', {
    value: function() {
      if(!object._private.expanded) {
        if(object.expandNode != undefined) {
          object.expandNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'select', {
    value: function() {
      object.content.click();
      onSelection();
    }
  });

  // Add selected property
  object._private.selected = false;
  Object.defineProperty(object.model, 'selected', {
    set: function (value) {
      if(object._private.selected != value) {
        object._private.selected = value;
        if(value) {
          object.component.addClass('selected');
          object.expandNode();
          onSelection();
        } else {
          object.component.removeClass('selected');
          object.colapseNode();
        }
      }
    },
    get: function() {
      return object._private.selected;
    }
  });

  object._private.onSelection;
  Object.defineProperty(object.model, 'onSelection', {
    set: function(value) {
      object._private.onSelectionCallback =  value;
    }
  });

  function onSelection() {
    if(object._private.onSelectionCallback !== undefined) {
      object._private.onSelectionCallback(object.model);
    }
  }

  $ui.register(object, 'expandNode', function() {
    object._private.expanded = true;
    // dropArrow.replaceClass('fa-chevron-left close', 'fa-chevron-down');
  });

  $ui.register(object, 'colapseNode', function() {
    object._private.expanded = false;
    // dropArrow.replaceClass('fa-chevron-down', 'fa-chevron-left closed');
  });

  return object;
}

$ui.addExtension('BaseListOrTreeItem', BaseListOrTreeItem);
