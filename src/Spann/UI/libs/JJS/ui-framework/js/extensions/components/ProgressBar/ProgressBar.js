function ProgressBar(parent, screen) {

  var object = $ui.BaseComponent(parent, screen);

  // Create progress bar holder
  var item = $ui.create(object.component);
  item.addClass('progress-bar')

  var holder = $ui.create(item);
  holder.addClass('holder');

  var clearBar = $ui.create(holder);
  clearBar.addClass('clear-bar');

  var bar = $ui.create(holder);
  bar.addClass('overlay-bar');

  object._private.width = 0;
  bar.style.width = object._private.width + '%';

  Object.defineProperty(object.model, 'runTo', {
    value: function(percent) {
      var endPoint = (percent / 100) * 100;
      if(object._private.width >= endPoint) {
        object._private.width = 0;
      }
      var id = setInterval(frame, 10);
      function frame() {
          if (object._private.width >= endPoint) {
              clearInterval(id);
          } else {
              object._private.width++;
              bar.style.width = object._private.width + '%';
          }
      }
    }
  });

  Object.defineProperty(object.model, 'start', {
    set: function (value) {
      object._private.width = value;
    }
  });

  return object;
}

$ui.addExtension('ProgressBar', ProgressBar);
