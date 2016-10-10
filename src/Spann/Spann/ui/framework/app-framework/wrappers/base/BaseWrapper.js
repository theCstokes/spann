define(function() {
  function BaseWrapper(objectType) {
    var object = {
      _private: {
        registeredOwner: [],
        contentOwners: [],
        registeredContainer: {},
        registeredProperties: []
      },
      model: {}
    };
    var contentItems = [];

    Object.defineProperty(object, 'setManager', {
      set: function(value) {
        object._private.manager = value;
      },
      get: function() {
        return object._private.manager;
      }
    });

    Object.defineProperty(object, 'create', {
      value: function(parent) {
        object.uiObject = objectType(parent);
        object.model = object.uiObject.model;
        object._private.registeredProperties.forEach(function(item) {
          object.uiObject.model[item.name] = item.value;
        });
        object.parentView = parent;
        createContentOwners();
        createContentContainers();
        return object;
      }
    });

    if(object._private.registeredProperties === undefined) {
      object._private.registeredProperties = [];
    }
    Object.defineProperty(object, 'registerProperty', {
      value: function(name) {
        Object.defineProperty(object, name, {
          set: function(value) {
            if(object.uiObject === undefined) {
              object._private.registeredProperties.push({
                name: name,
                value: value
              });
            } else {
              object.uiObject[name] = value;
            }
          }
        });
      }
    });

    Object.defineProperty(object, 'addOwner', {
      value: function (componentName) {
        this._private.registeredOwner.push(componentName);
      }
    });

    if(object._private.level === undefined) {
      object._private.level = $ui.ScreenLevelEnum.DEFAULT;
    }
    Object.defineProperty(object, "level", {
      get: function() {
        return object._private.level;
      },
      set: function(value) {
        object._private.level = value;
      }
    });

    function createContentOwners() {
      var owners = object._private.registeredOwner;
      owners.forEach(function (ownerName) {
        var container = object.uiObject.containers[ownerName];
        if(container != undefined) {
          object._private.contentOwners.push({
            component: container,
          });
        }
      });
    }

    Object.defineProperty(object, 'owners', {
      get: function() {
        return object._private.contentOwners;
      }
    });

    Object.defineProperty(object, 'addComponentContainer', {
      value: function (propertyName, componentName, transform) {
        this._private.registeredContainer[propertyName] = {name: componentName, transform: transform};
      }
    });

    /**
    *
    */
    Object.defineProperty(object, 'hasAvailableOwner', {
      get: function() {
        return object.nextAvailableOwner !== undefined;
      }
    });

    Object.defineProperty(object, 'nextAvailableOwner', {
      get: function() {
        return object._private.contentOwners.find(function(owner) {
          return owner.currentItem === undefined;
        });
      }
    });

    if(object._private.blurSiblings === undefined) {
      object._private.blurSiblings = false;
    }
    Object.defineProperty(object, 'blurSiblings', {
      get: function() {
        return object._private.blurSiblings;
      },
      set: function(value) {
        object._private.blurSiblings = value;
      }
    });

    function createContentContainers() {
      var containers = object._private.registeredContainer;
       for(var key in containers) {
         if(!containers.hasOwnProperty(key)) {
           continue;
         }
         var obj = containers[key];
         var containerName = obj.name;
         var container = object.uiObject.containers[containerName];
         if(container != undefined) {
           if(obj.transform !== undefined) {
             object[key] = obj.transform(object[key]);
           }

           var items = $builder.build(container, object, object[key]);
           items.forEach(function (item) {
             if(item.id != undefined) {
               object.model[item.id] = item;
             }
           });
         }
       }
    }

    return object;
  }
  return BaseWrapper
});
