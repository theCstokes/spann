define(function() {
  function BaseWrapper(objectType) {
    var object = {
      _private: {
        registeredOwner: [],
        contentOwners: [],
        registeredContainer: {}
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
    })

    Object.defineProperty(object, 'create', {
      value: function(parent) {
        object.uiObject = objectType(parent);
        object.parentView = parent;
        if(object.uiObject.id != undefined) {
          object.model[object.uiObject.id] = uiObject;
        }
        createContentOwners();
        createContentContainers();
        return object;
      }
    });

    Object.defineProperty(object, 'addOwner', {
      value: function (componentName) {
        this._private.registeredOwner.push(componentName);
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
      value: function (propertyName, componentName) {
        this._private.registeredContainer[propertyName] = componentName;
      }
    });

    function createContentContainers() {
      var containers = object._private.registeredContainer;
       for(var key in containers) {
         if(!containers.hasOwnProperty(key)) {
           continue;
         }
         var containerName = containers[key];
         var container = object.uiObject.containers[containerName];
         if(container != undefined) {
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
