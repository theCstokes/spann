function UIDecorators(object) {
  function string(name, parent) {
    var item = $ui.create('div', parent);
    item.addClass('ui-decorators-string');
    if(object[name] !== undefined) {
      object._private[name] = object[name];
    }
    renderStringItem();
    Object.defineProperty(object.model, name, {
      set: function(value) {
        if(object._private[name] !== value) {
          object._private[name] = value;
          renderStringItem();
        }
      },
      get: function() {
        return object._private[name];
      }
    });
    function renderStringItem() {
      item.textContent = object._private[name];
    }
    return item;
  }

  function icon(name, parent) {
    var icon = $ui.create('div', parent);
    icon.addClass('ui-decorators-icon fa');
    if(object[name] !== undefined) {
      renderIcon(object[name]);
      object._private.icon = object[name];
    }
    Object.defineProperty(object.model, name, {
      set: function (value) {
        if(object._private.icon != value) {
          renderIcon(value);
          object._private.icon = value;
        }
      },
      get: function() {
        return object._private.icon;
      }
    });

    function renderIcon(newValue) {
      if(object._private.icon !== undefined) {
        icon.replaceClass(object._private.icon, value);
      } else {
        icon.addClass(newValue);
      }
    }
  }

  function size(obj) {
    object._private.size = $ui.Size.NORMAL;
    obj.addClass(object._private.size);
    Object.defineProperty(object.model, 'size', {
      set: function(value) {
        if(object._private.size !== value) {
          obj.replaceClass(object._private.size, value);
          object._private.size = value;
        }
      },
      get: function() {
        return object._private.size;
      }
    });
  } 

  return {
    string: string,
    icon: icon,
    size: size
  }
}

$ui.addExtension('UIDecorators', UIDecorators);
