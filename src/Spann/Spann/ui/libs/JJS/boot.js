function ui_boot(callback) {
  console.log('Booting UI Framework...');
  loadScripts([
    "./framework/ui-framework/js/$ui.js",
    "./framework/ui-framework/js/$builder.js",
    "./framework/app-framework/$T.js",
    "./framework/app-framework/$data.js",
    "./framework/$utils.js",
    "./framework/dist/build.js",
    "./framework/libs/ace/src-min-noconflict/ace.js"
  ], function() {
      console.log('UI Framework Started.');
      callback();
  });
}
