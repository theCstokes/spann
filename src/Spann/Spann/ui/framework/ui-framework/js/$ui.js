function build() {
  console.log('Init $ui Started...');
  var object = {
    _private: {
      screens: [],
      app: {}
    }
  };

  Object.defineProperty(object, 'app', {
    set: function (name) {
      var appDiv = document.getElementById(name);
      addUtilFunctions(appDiv);
      this._private.app = appDiv
    },
    get: function () {
      return this._private.app;
    }
  });

  Object.defineProperty(object, 'frame', {
    set: function (frame_item) {
      var frame = object._private.frame = frame_item();
      frame.create(this._private.app);
      this._private.screens.push(frame);
      handleCreateCallbacks(frame);
    },
    get: function () {
      return object._private.frame;
    }
  });

  Object.defineProperty(object, 'screens', {
    get: function() {
      return this._private.screens.map(function (screen) {
        return screen.model;
      });
    }
  });

  Object.defineProperty(object, 'topScreen', {
    get: function() {
      var lastIndex = this._private.screens.length - 1;
      if(lastIndex >= 0) {
        return this._private.screens[lastIndex];
      }
    }
  });

  Object.defineProperty(object, 'push', {
    value: function(screen_item, data) {
      var screen = screen_item;
      if(typeof(screen) === "function") {
        screen = screen();
      }
      var size = this.screens.length - 1;
      if(size < 0) {
        addScreen(screen, this._private.app, data);
      }
      for(var i = size; i >= 0; i--) {
        var currentScreen = this._private.screens[i];
        if(currentScreen.owners.length === 0) {
          continue;
        }
        var screenAdded = currentScreen.owners.some(function (owner) {
          if(owner.currentItem !== undefined) {
            return false;
          }
          addScreen(screen, owner.component, data);
          return true;
        });
        if(screenAdded) {
          break;
        } else {
          addScreen(screen, currentScreen.parentView, data);
          break;
        }
      }
    }
  });

  function addScreen(screen, parent, data) {
    screen.create(parent);
    object._private.screens.push(screen);
    handleCreateCallbacks(screen, data);
  }

  function handleCreateCallbacks(component, data) {
    if(component.hasOwnProperty('show')) {
      component.show(data);
    }
  }

  Object.defineProperty(object, 'pop', {
    value: function() {
      this._private.screens.pop();
    }
  });

  Object.defineProperty(object, 'addExtension', {
    value: function(key, extension) {
      // Create the extension
      Object.defineProperty(object, key, {
        value: function(parent, screen) {
            return new extension(parent, screen);
        }
      });
    }
  });

  Object.defineProperty(object, 'addStyleExtension', {
    value: function(key, extension) {
      // Create the extension
      Object.defineProperty(object, key, {
        get: function() {
            return extension;
        }
      });
    }
  });

  Object.defineProperty(object, 'popTo', {
    value: function(target) {
      if(this._private.screens.indexOf(target) > -1) {
        while(this._private.screens.length > 0) {
          if(this.topScreen === target) {
            break;
          }
          this.topScreen.uiObject.component.remove();
          this.pop();
        }
      }
    }
  })

  function addUtilFunctions(item) {
    Object.defineProperty(item, 'addClass', {
      value: function(name) {
        var context = this;
        var items = name.match(/\S+/g) || [];
        items.forEach(function (item) {
          var itemName = item + " ";
          var reg = new RegExp(itemName);
          if(!reg.test(context.className)) {
            context.className += (itemName);
          }
        });
      }
    });

    Object.defineProperty(item, 'removeClass', {
      value: function(name) {
        var context = this;
        var items = name.match(/\S+/g) || [];
        items.forEach(function (item) {
          var itemName = item + " ";
          var reg = new RegExp(itemName);
          context.className = context.className.replace(reg, "");
        });
      }
    });

    Object.defineProperty(item, 'replaceClass', {
      value: function(oldClass, newClass) {
        this.removeClass(oldClass);
        this.addClass(newClass);
      }
    });
  }

  Object.defineProperty(object, 'create', {
    value: function(type, parent) {
      if(parent == undefined) {
        parent = type;
        type = 'div';
      }
      var item = document.createElement(type);
      if(parent != undefined) {
        parent.appendChild(item);
      }
      addUtilFunctions(item);
      return item;
    }
  });

  Object.defineProperty(object, 'register', {
    value: function(target, name, functionCallback) {
      target[name] = functionCallback;
    }
  });

  return object;
  console.log('Init $ui Done');
}

var $ui = build();
