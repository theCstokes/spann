function Tree(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.noMargin = true;
  object.component.addClass('ui-tree');

  var listHolder = $ui.create('ul', object.component);
  listHolder.addClass('holder');

  object._private.listItems = [];

  Object.defineProperty(object.model, 'decorator', {
    set: function (value) {
      object.component.addClass(value);
    }
  });

  // Object.defineProperty(object.model, 'dataPropteryTransform', {
  //   set: function(value) {
  //     object._private.dataPropteryTransform = value;
  //   },
  //   get: function() {
  //     return object._private.dataPropteryTransform;
  //   }
  // })

  Object.defineProperty(object.model, 'items', {
    set: function(items) {
      addItems(items);
      console.log(object.component);
    },
    get: function() {
      return object._private.listItems.map(function(item) {
        return item.model;
      });
    }
  });

  Object.defineProperty(object.model, 'addItems', {
    value: function(item) {
      addItems(item);
    }
  });

  Object.defineProperty(object.model, 'addItem', {
    value: function(item) {
      addItems([item]);
    }
  });

  // object._private.position = "top";
  Object.defineProperty(object.model, 'position', {
    set: function (value) {
      object._private.position = value;
      setPosition();
    }
  });

  function setPosition() {
    if(object._private.position !== undefined) {
      var index = 0;

      if(object._private.position === 'top') {
        index = 0;
      } else if(object._private.position === 'bottom') {
        index = object._private.listItems.length - 1;
      }

      var item = object._private.listItems[index];
      if(item !== undefined && item.component !== undefined) {
        item.component.scrollIntoView();
      }
    }
  }

  function addItems(dataItems) {
    dataItems.forEach(function (value) {
      var item = $ui.create('li', listHolder);
      item.addClass('tree-item');

      var elementType = $ui.TreeElementType.ITEM;
      if(value.hasOwnProperty('elementType')) {
        elementType = value.elementType;
      }
      
      var element;
      if(elementType === $ui.TreeElementType.ITEM) {
        element = object._private.itemStyle(item); // no need for screen.
      } else if(elementType === $ui.TreeElementType.NODE) {
        if(object._private.nodeStyle !== undefined) {
          element = object._private.nodeStyle(item); // no need for screen.
        } else {
          element = object._private.itemStyle(item); // no need for screen.
        }
      } else {
        return;
      }

      if(element.hasOwnProperty('content') && element.content != undefined) {
        element.content.onclick = onClickCallback;
        element.content.index = object._private.listItems.length;
      } else {
        item.onclick = onClickCallback;
        item.index = object._private.listItems.length;
      }
      element.model.onSelection = object._private.onNodeSelection;
      for(var key in value) {
        element.model[key] = value[key];
      }
      object._private.listItems.push(element);
    });
    setPosition();
  }

  Object.defineProperty(object.model, "onClick", {
    set: function(value) {
      object._private.onClickCallback = value;
    }
  });

  Object.defineProperty(object.model, 'onSelection', {
    set: function(value) {
      object._private.onNodeSelection =  function(item) {
        object._private.selected = item;
        value(item);
      };
    }
  });

  Object.defineProperty(object.model, 'selected', {
    get: function() {
      return object._private.selected;
    }
  });

  Object.defineProperty(object.model, 'style', {
    set: function (value) {
      object._private.itemStyle = value;
    }
  });

  Object.defineProperty(object.model, 'nodeStyle', {
    set: function (value) {
      object._private.nodeStyle = value;
    }
  });

  var onClickCallback = function(event){
    if(object._private.onClickCallback != undefined) {
      var targetIndex = event.currentTarget.index;
      var targetItem;
      object._private.listItems.forEach(function (item, index) {
        if(index === targetIndex) {
          item.model.selected = true;
          targetItem = item;
        } else {
          item.model.selected = false;
        }
      });
      object._private.onClickCallback({event: event, target: targetItem});
    }
  };

  object.show = function () {
    console.log('show');
    // this.component.style.height = "436px";
  }

  return object
}

$ui.addExtension('Tree', Tree);
