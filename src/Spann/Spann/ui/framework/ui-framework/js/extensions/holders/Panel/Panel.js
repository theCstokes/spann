function Panel(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-panel');

  var topDock = $ui.create(object.component);
  topDock.addClass('top-dock has-top-dock');
  object.addContainer('topDock', topDock);

  object._private.showTopDockBar = true;
  Object.defineProperty(object.model, "showTopDock", {
    set: function (value) {
      object._private.showTopDockBar = value;
      if(value) {
        topDock.addClass('has-top-dock');
      } else {
        topDock.removeClass('has-top-dock');
      }
    },
    get: function () {
      return object._private.showTopDockBar;
    }
  });

  // Must be named the same as the container to be called.
  Object.defineProperty(object.model, "topDock", {
    set: function (value) {
      if(value !== undefined) {
        topDock.addClass('has-top-dock-content');
      } else {
        topDock.removeClass('has-top-dock-content');
      }
    }
  });

  var body = $ui.create(object.component);
  body.addClass('body');
  object.addContainer(body);

  var bottomDock = $ui.create(object.component);
  bottomDock.addClass('bottom-dock');
  object.addContainer('bottomDock', bottomDock);

  // Must be named the same as the container to be called.
  Object.defineProperty(object.model, "bottomDock", {
    set: function (value) {
      if(value !== undefined) {
        bottomDock.addClass('has-bottom-dock');
      } else {
        bottomDock.removeClass('has-bottom-dock');
      }
    }
  });

  // object._private.showFooterBar = false;
  // Object.defineProperty(object.model, "showFooterBar", {
  //   set: function (value) {
  //     object._private.showFooterBar = value;
  //     if(value) {
  //       object.elements.topDock.addClass('hasFooter');
  //     } else {
  //       object.elements.topDock.removeClass('hasFooter');
  //     }
  //   },
  //   get: function () {
  //     return object._private.showFooterBar;
  //   }
  // });

  return object;
}

$ui.addExtension('Panel', Panel);
