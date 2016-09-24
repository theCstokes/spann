function Panel(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-panel');

  var header = $ui.create(object.component);
  header.addClass('header hasHeader');
  // header.textContent = "test";
  // This adds holder for ui builder
  object.addContainer('header', header);

  var body = $ui.create(object.component);
  body.addClass('body');
  object.addContainer(body);

  var bottomDock = $ui.create(object.component);
  bottomDock.addClass('bottom-dock');
  object.addContainer('bottomDock', bottomDock);

  Object.defineProperty(object.model, "bottomDock", {
    set: function (value) {
      console.log(value);
      if(value !== undefined) {
        bottomDock.addClass('has-bottom-dock');
      } else {
        bottomDock.removeClass('has-bottom-dock');
      }
    }
  });

  object._private.showHeaderBar = true;
  Object.defineProperty(object.model, "showHeaderBar", {
    set: function (value) {
      object._private.showHeaderBar = value;
      if(value) {
        header.addClass('hasHeader');
      } else {
        header.removeClass('hasHeader');
      }
    },
    get: function () {
      return object._private.showHeaderBar;
    }
  });

  object._private.showFooterBar = false;
  Object.defineProperty(object.model, "showFooterBar", {
    set: function (value) {
      object._private.showFooterBar = value;
      if(value) {
        object.elements.header.addClass('hasFooter');
      } else {
        object.elements.header.removeClass('hasFooter');
      }
    },
    get: function () {
      return object._private.showFooterBar;
    }
  });

  return object;
}

$ui.addExtension('Panel', Panel);
