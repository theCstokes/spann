function Editor(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-editor');

  var inputEditor = $ui.create('pre', object.component);
  inputEditor.addClass('input-editor');
  inputEditor.id = "inputEditor";
  inputEditor.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = ace.edit("inputEditor");
  editor.setOptions({
    enableBasicAutocompletion: true
  });
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/python");

  Object.defineProperty(object.model, 'type', {
    set: function(value) {
      if(type === "python") {

      }
    },
    get: function() {

    }
  })
}

$ui.addExtension('Editor', Editor);
