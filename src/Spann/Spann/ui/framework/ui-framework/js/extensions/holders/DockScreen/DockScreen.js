function DockScreen(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-dock-screen');

  // var modal = $ui.create(object.component);
  // modal.addClass('modal');

  var content = $ui.create(object.component);
  content.addClass('modal-content');
  object.addContainer(content);

  if(object._private.alignVertical === undefined) {
    object._private.alignVertical = $ui.DockLocations.TOP;
  }
  Object.defineProperty(object.model, "alignVertical", {
    get: function() {
      return object._private.alignVertical;
    },
    set: function(value) {
      if(value !== object._private.alignVertical) {
        object._private.alignVertical = value;
        switch(object._private.alignVertical) {
          case $ui.DockLocations.TOP:
            return object.component.replaceClass("align-bottom", "align-top");
          case $ui.DockLocations.BOTTOM:
            return object.component.replaceClass("align-top", "align-bottom");
          default:
            return object.component.replaceClass("align-bottom", "align-top");
        }
      }
    }
  });

  if(object._private.alignHorizontal === undefined) {
    object._private.alignHorizontal = $ui.DockLocations.LEFT;
  }
  Object.defineProperty(object.model, "alignHorizontal", {
    get: function() {
      return object._private.alignHorizontal;
    },
    set: function(value) {
      if(value !== object._private.alignHorizontal) {
        object._private.alignHorizontal = value;
        switch(object._private.alignVertical) {
          case $ui.DockLocations.LEFT:
            return object.component.replaceClass("align-right", "align-left");
          case $ui.DockLocations.RIGHT:
            return object.component.replaceClass("align-left", "align-right");
          default:
            return object.component.replaceClass("align-right", "align-left");
        }
      }
    }
  });

  window.onclick = function(event) {
    if (event.target === object.component) {
        $ui.pop();
    }
  }

  return object;
}

$ui.addExtension('DockScreen', DockScreen);
