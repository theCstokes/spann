function Frame(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-frame');

  var topBar = $ui.create(object.component);
  object.addContainer('topBar', topBar);
  topBar.addClass('topBar');

  // Must be named the same as the container to be called.
  Object.defineProperty(object.model, "topBar", {
    set: function (value) {
      if(value !== undefined) {
        topBar.addClass('has-top-bar-content');
        holderContent.removeClass('maximizeV');
        leftBar.removeClass('maximizeV');
      } else {
        topBar.removeClass('has-top-bar-content');
        holderContent.addClass('maximizeV');
        leftBar.addClass('maximizeV');
      }
    }
  });

  var leftBar = $ui.create(object.component);
  object.addContainer('leftBar', leftBar);
  leftBar.addClass('leftBar');

  // Must be named the same as the container to be called.
  Object.defineProperty(object.model, "leftBar", {
    set: function (value) {
      if(value !== undefined) {
        leftBar.addClass('has-left-bar-content maximizeH');
        holderContent.removeClass('maximizeH');
      } else {
        leftBar.removeClass('has-left-bar-content');
        holderContent.addClass('maximizeH');
      }
    }
  });


  var holderContent = $ui.create(object.component);
  holderContent.addClass('holder');

  var mainContent = $ui.create(holderContent);
  object.addContainer('mainContent', mainContent);
  mainContent.addClass('mainContent');

  return object;
}
$ui.addExtension('Frame', Frame);
