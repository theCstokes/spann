function BaseExtension(parent, screen) {
  var object = {
    model: {},
    component: {},
    elements: {},
    _private: {},
    screen: screen
  };

  var component = $ui.create(parent);
  object.component = component;

  object._private.name = undefined;
  Object.defineProperty(object.model, "id", {
    set: function (value) {
      object._private.name = value;
    },
    get: function () {
      return object._private.name;
    }
  });

  object._private.data = {};
  Object.defineProperty(object.model, "data", {
    set: function (value) {
      object._private.data = value;
    },
    get: function () {
      return object._private.data;
    }
  });

  object._private.visible = true;
  Object.defineProperty(object.model, "visible", {
    set: function (value) {
      if (value !== object._private.visible) {
        object._private.visible = value;
        if (object._private.visible) {
          object.component.removeClass("ui-invisible")
        } else {
          object.component.addClass("ui-invisible");
        }
      }
    },
    get: function () {
      return object._private.data;
    }
  });

  Object.defineProperty(object.model, 'component', {
    set: function (value) {
      object.component = value;
    },
    get: function () {
      return object.component;
    }
  });

  return object;
}

$ui.addExtension('BaseExtension', BaseExtension);
