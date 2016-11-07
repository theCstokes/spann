define([
  'App/screens/Login/screen_login',
  'BasicFrame',
  'ContextMenu'
], function(screen_login, BasicFrame, ContextMenu) {
  var ctxOpen = false;

  function start() {
    init({
      debug: true
    });

    // $ui.frame = BasicFrame;
    // $ui.push(screen_login);

    requirejs([
        'App/projectFrame',
        'App/screens/Home/screenHome'], function (mainFrame, homeScreen) {
          $ui.frame = mainFrame;
          $ui.push(homeScreen);
        });

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", window.location.href.split('ui/')[0] + "api/v1/User");
    //
    //   //xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    //   //// xhr.setRequestHeader('Content-type', 'application/ecmascript');
    //   //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.responseType = 'json';
    // xhr.onreadystatechange = function () {
    //     console.log("data: " + xhr.response);
    // }
    // var message = { name: "Old Ben" };
    // var blob = new Blob([JSON.stringify(message, null, 2)], { type: 'application/json' });
    // xhr.send(blob);
    // xhr.send();
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
