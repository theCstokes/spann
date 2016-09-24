function loadDone(urls, callback, index) {
  // console.log('Loaded: ' + urls[index]);
  index++;
  if(index >= urls.length) {
    callback();
  } else {
    loadScripts(urls, callback, index);
  }
}

function loadScripts(urls, callback, index){
  if(index == undefined) {
    index = 0;
  }
  var url = urls;
  if(Array.isArray(urls)) {
    url = urls[index];
  }
  var script = document.createElement("script")
  script.type = "text/javascript";
  // console.log('Loading: ' + url);
  if (script.readyState) {
      script.onreadystatechange = function(){
          if (script.readyState == "loaded" ||
                  script.readyState == "complete"){
              script.onreadystatechange = null;
              loadDone(urls, callback, index);
          }
      };
  } else {
      script.onload = function(){
          loadDone(urls, callback, index);
      };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function loadFramework(callback) {
  loadScripts([
    "./framework/boot.js",
  ], function() {
      ui_boot(callback);
  });
}

function loadExternalLibs(callback) {
  console.log('Loading External Libraries...');
  loadScripts([
    "./libs/require.js",
    "./require.config.js"
  ], function() {
      console.log('External Libraries Loaded.');
      callback();
  });
}

function run() {
}

function launchApp() {
  console.log('Started.');
  console.log('Launching App...');
  $ui.app = 'app';
  requirejs(["App/app"], function(app) {
      app.start();
  });
  console.log('App Launched.');
}

function boot() {
  console.log('Booting...');
  loadFramework(function() {
    loadExternalLibs(launchApp);
  })
}

boot();
