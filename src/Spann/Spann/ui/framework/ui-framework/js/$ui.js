function build() {
  console.log('Init $ui Started...');
  var object = {
    _private: {
      screens: [],
      app: {},
      contextMenu: {}
    }
  };

  Object.defineProperty(object, 'initialize', {
    value: function() {
      /// TODO - Init app code;
      /// Context Menu
    }
  });

  /**
   * Gets the main div and uses as basis for the application.
   * @argument - Name of main div to find.
   */
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

  /**
   * Sets the main frame for the app.
   * @argument - The Frame component to act as a basis for the app.
   */
  Object.defineProperty(object, 'frame', {
    set: function (frame_item) {
      var frame = object._private.frame = frame_item();
      addScreen(frame, this._private.app);
    },
    get: function () {
      return object._private.frame;
    }
  });

  /**
   * @return - the array of screens currently added.
   */
  Object.defineProperty(object, 'screens', {
    get: function() {
      return this._private.screens.map(function (screen) {
        return screen.model;
      });
    }
  });

  /**
   * @return - the last pushed screen.
   */
  Object.defineProperty(object, 'topScreen', {
    get: function() {
      var lastIndex = this._private.screens.length - 1;
      if(lastIndex >= 0) {
        return this._private.screens[lastIndex];
      }
    }
  });

  // Special defined positions.
  var ScreenLevelEnum = Object.freeze({BASE: -5, TOP: -1, DEFAULT: -2, BOTTOM: -3});
  Object.defineProperty(object, "ScreenLevelEnum", {
    get: function() {
      return ScreenLevelEnum;
    }
  });

  /**
   * Pushes the given screen.
   * @argument - screen object or function 
   *             data the data to give to the screen onShow
   */
  Object.defineProperty(object, 'push', {
    value: function(screen_item, data) {
      var screen = screen_item;
      if(typeof(screen) === "function") {
        screen = screen();
      }
      var size = this.screens.length;
      if(size == 0) {
        return addScreen(screen, this._private.app, data);
      }
      // pushScreenToEnd(size, screen, data);
      switch(screen.level) {
        case ScreenLevelEnum.BASE:
          return addScreen(screen, this._private.app, data);
        case ScreenLevelEnum.TOP:
          return pushScreenToStart(size, screen, data);
        case ScreenLevelEnum.DEFAULT:
          return pushScreenToEnd(size, screen, data);
        case ScreenLevelEnum.BOTTOM:
          return pushScreenToEnd(size, screen, data);
        default:
          return pushScreenToEnd(size, screen, data);
      } 
    }
  });

  function pushScreenToEnd(size, screen, data) {
    for(var i = size - 1; i >= 0; i--) {
      var currentScreen = object._private.screens[i];
      if(currentScreen.owners.length === 0) {
          continue;
      }
      return pushScreen(currentScreen, screen, data);
    }
    console.warn("failed to find owner");
    return addScreen(screen, object._private.app, data);
  }

  function pushScreenToStart(size, screen, data) {
   for(var i = 0; i < size; i++) {
      var currentScreen = object._private.screens[i];
      if(currentScreen.owners.length === 0) {
          continue;
      }
      return pushScreen(currentScreen, screen, data);
    }
    console.warn("failed to find owner");
    return addScreen(screen, object._private.app, data);
  }

  function pushScreen(currentScreen, screen, data) {
    if(currentScreen.hasAvailableOwner) {
      var owner = currentScreen.nextAvailableOwner;
      return addScreen(screen, owner.component, data);
    } else {
      return addScreen(screen, currentScreen.parentView, data);
    }
  }

  function addScreen(screen, parent, data) {
    if(screen.blurSiblings) {
      for(var i = 0; i < parent.children.length; i++) {
        var item = parent.children[i];
        item.style.webkitFilter = "blur(5px)";
      }
    }
    screen.create(parent);
    object._private.screens.push(screen);
    handleCreateCallbacks(screen, data);
  }

  function handleCreateCallbacks(component, data) {
    component.invoke('show', data);
  }

  /**
   * Removes the last element from thee screen.
   */
  Object.defineProperty(object, 'pop', {
    value: function() {
      if(this._private.screens.length > 0) {
        if(this.topScreen.blurSiblings) {
          var items = this.topScreen.uiObject.component.parentElement.children;
          for(var i = 0; i < items.length; i++) {
            var item = items[i];
            if(item === this.topScreen.uiObject.component) {
              continue;
            }
            item.style.webkitFilter = "";
          }
        }
        this.topScreen.uiObject.component.remove();
        this.topScreen.invoke('remove');
        this._private.screens.pop();
      }
    }
  });

  /**
   * Adds control extension.
   * @argument - key name of the extension
   *             functional callback to make the extension.
   */
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

  /**
   * Adds style extension.
   * @argument - key name of the extension
   *             functional callback to make the extension.
   */
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

  /**
   * Removes all elements up to the given object.
   * @argument - target to end removal at.
   */
  Object.defineProperty(object, 'popTo', {
    value: function(target) {
      if(this._private.screens.indexOf(target) > -1) {
        while(this._private.screens.length > 0) {
          if(this.topScreen === target) {
            break;
          }
          this.pop();
        }
      }
    }
  });

  /**
   * Adds the control util functions to given object
   * @argument object to add functions to.
   */
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

  if(object._private.events === undefined) {
    object._private.events = {};
  }

  Object.defineProperty(object, 'addEvent', {
    value: function(name, functionCallback) {
      object._private.events[name] = functionCallback;
    }
  });

  Object.defineProperty(object, 'notifyEvent', {
    value: function(name, data) {
      object._private.events[name](data);
    }
  });

  Object.defineProperty(object, 'addContextEvent', {
    value: function(name, functionCallback, target) {
      object._private.contextMenu.events[name] = functionCallback;
    }
  });

  console.log('Init $ui Done');
  return object;
}

var $ui = build();
