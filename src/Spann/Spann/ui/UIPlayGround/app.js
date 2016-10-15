define([
  'PlayGroup/demoFrame',
  'PlayGroup/screen_Editor',
  'PlayGroup/dialog_Demo'
], function(demoFrame, screen_Editor, dialog_Demo) {

  function start() {
    $ui.frame = demoFrame;

    $ui.push(screen_Editor);
    //$ui.push(dialog_Demo);

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", window.location.href.split('ui/')[0] + "api/v1/File");
    // xhr.responseType = 'json';
    // xhr.onreadystatechange = function () {
    //     console.log("data: " + xhr.response);
    // }
    // var data = { name: "Order66", sourceCode: "for(0 to N): Kill all Jedi;" };
    // var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    // xhr.send(blob);
  }
  return {
    start: start
  }
});
