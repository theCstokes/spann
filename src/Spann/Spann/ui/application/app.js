define([
  'App/screens/Login/screen_login',
  'BasicFrame',
  'ContextMenu'
], function(screen_login, BasicFrame, ContextMenu) {
  var ctxOpen = false;

  function start() {
    init({
      debug: false
    });

    $ui.addFrame(BasicFrame);
    $ui.push(screen_login);
  }

  function init(settings) {
    var debug = false;
    if(settings.hasOwnProperty('debug')) {
      debug = settings.debug;
    }

    if(debug) {
      // TODO - setup code for debug 
    } else {
      $ui.addEvent("ctxPop", function() {
        ctxOpen = false;
        console.log('func');
      });

      window.oncontextmenu = function(event) {
        if (!ctxOpen) {
          ctxOpen = true;
          $ui.push(ContextMenu);
        }

        $ui.notifyEvent("ctxMove", {left: event.clientX, top: event.clientY});
        //console.log('moving context menu to', event.clientX, event.clientY);
        return false;
      }
    }
  }

  return {
    start: start
  }
});
