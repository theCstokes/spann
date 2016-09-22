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

  return {
    string: string,
    icon: icon
  }
}

$ui.addExtension('UIDecorators', UIDecorators);
