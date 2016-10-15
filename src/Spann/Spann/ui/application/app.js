define([
  'App/screens/Login/screen_login',
  'BasicFrame'
], function(screen_login, BasicFrame) {

  function start() {
    $ui.frame = BasicFrame;
    $ui.push(screen_login);

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
