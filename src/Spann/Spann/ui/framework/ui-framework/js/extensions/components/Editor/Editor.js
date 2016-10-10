function Editor(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-editor');

  var inputEditor = $ui.create('div', object.component);
  inputEditor.addClass('input-editor');
  inputEditor.id = "inputEditor";
  inputEditor.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = ace.edit("inputEditor");
  editor.setOptions({
    enableBasicAutocompletion: true
  });

  editor.setTheme("ace/theme/twilight");

  // Object.defineProperty(object.model, 'editor', {
  //   get: function () {
  //     return editor;
  //   }
  // });

  Object.defineProperty(object.model, 'value', {
    get: function() {
      return editor.getValue();
    },
    set: function(value) {
      editor.setValue(value);
    }
  });

  Object.defineProperty(object.model, 'mode', {
    set: function(value) {
      if(object._private.mode !== value) {
        object._private.mode = value;
        editor.session.setMode(value);
      }
    },
    get: function() {
      return object._private.mode;
    }
  });

  object.show = function() {
    console.log("show editor");
    inputEditor.style.height = this.component.parentElement.offsetHeight + "px";
    inputEditor.style.width = this.component.parentElement.offsetWidth + "px";

    inputEditor.style.top = this.component.parentElement.offsetTop + "px";
    inputEditor.style.left = this.component.parentElement.offsetLeft + "px";
  }

  return object
}

$ui.addExtension('Editor', Editor);
