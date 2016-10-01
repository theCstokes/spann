function Console(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-console');

  var inputEditor = $ui.create('div', object.component);
  inputEditor.addClass('input-console');
  inputEditor.id = "inputEditor";
  inputEditor.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = ace.edit("inputEditor");
  editor.setOptions({
    enableBasicAutocompletion: true
  });

  var text = "Python Started.";
  var lineSeparater = "\n";
  var lineStart = ">>>_";
  text += lineSeparater + lineStart;
  editor.setValue(text, 1);

  editor.commands.addCommand({
      name: "send",
      bindKey: {win: "Enter", mac: "Enter"},
      exec: function(editor) {
        var lines = editor.session.doc.$lines;
        var endIndex = lines.length - 1;
        var lastLine = lines[endIndex].replace(lineStart, "");
        text = lines.reduce(function(result, item, idx) {
          if(idx >= endIndex) {
            // result += lineSeparater;
            return result;
          }
          result += item + lineSeparater;
          return result;
        }, "");
        text += lastLine + lineSeparater + lineStart;
        editor.setValue(text, 1);
        if(object._private.onCommandRun !== undefined) {
          object._private.onCommandRun(lastLine);
        }
      }
  });

  // editor.on("input", function() {
  //     editor.setValue(text, text.length - 1);
  // });

  // var consoleState1 = {};
  // var consoleState2 = {};
  // var state = 0;
  // var lastText = "";

  var textReset = false;

  editor.on("change", function(vv) {
      console.log("Change!!!" + editor);
      if(textReset) {
        textReset = false;
        return;
      }
      var linesLenght = editor.session.doc.$lines.length;
      if(vv.end.row === linesLenght - 1 && vv.start.column >= 4) {
        text = editor.getValue();
      } else {
        if(text !== editor.getValue()) {
          textReset = true;
          editor.setValue(text, 1);
        } else {
          textReset = false;
          editor.selection.moveTo(linesLenght - 1, 5)
        }
      }
  });

  // editor.setTheme("ace/theme/twilight");

  Object.defineProperty(object.model, 'onCommandRun', {
    set: function(value) {
      object._private.onCommandRun = value;
    },
    get: function() {
      return object._private.onCommandRun;
    }
  });

  // editor.renderer.setOption('showLineNumbers', false);
  editor.renderer.setShowGutter(false);

  Object.defineProperty(object.model, 'e', {
    get: function () {
      return editor;
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

  Object.defineProperty(object.model, 'insertLine', {
    value: function(value) {
      var lines = editor.session.doc.$lines;
      var endIndex = lines.length - 1;
      var lastLine = lines[endIndex].replace(lineStart, "");
      text = lines.reduce(function(result, item, idx) {
        if(idx >= endIndex) {
          // result += lineSeparater;
          return result;
        }
        result += item + lineSeparater;
        return result;
      }, "");
      text += value + lineSeparater + lastLine + lineSeparater + lineStart;
      editor.setValue(text, 1);
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

$ui.addExtension('Console', Console);
