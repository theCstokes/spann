define([
  'App/screens/Login/screen_login',
  'BasicFrame',
  'ContextMenu'
], function(screen_login, BasicFrame, ContextMenu) {

  function start() {
    $ui.frame = BasicFrame;
    $ui.push(screen_login);

    window.oncontextmenu = function(event) {
      $ui.push(ContextMenu);
      $ui.notifyEvent("move", {left: event.clientX, top: event.clientY});
      console.log('moving to', event.clientX, event.clientY);
      return false;
    }

     //add screen
     

    //  $ui.push(homeScreen);

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
  return {
    start: start
  }
});
