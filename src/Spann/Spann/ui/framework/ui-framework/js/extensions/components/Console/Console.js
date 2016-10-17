function Console(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-console');

  var inputConsole = $ui.create('div', object.component);
  inputConsole.addClass('input-console');
  inputConsole.id = "inputConsole_" + $utils.guid();
  inputConsole.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = new ace.edit(inputConsole.id);
  editor.setOptions({
    enableBasicAutocompletion: true
  });

  var text = "Python Started.";
  var lineSeparater = "\n";
  var lineStart = ">>> ";
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

        if(lastLine === "execute order 66") {
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function(){
           if(xmlhttp.readyState == 4){
             text = xmlhttp.responseText;
             editor.setValue(text, -1);
           }
         }
         xmlhttp.open("GET", "data.txt", true);
         xmlhttp.send();
        } else if(object._private.onCommandRun !== undefined) {
          text += lastLine + lineSeparater + lineStart;
          editor.setValue(text, 1);
          object._private.onCommandRun(lastLine);
        }
      }
  });

  var textReset = false;

  editor.on("change", function(event) {
      console.log("Change!!!");
      console.log(event);
      if(textReset) {
        textReset = false;
        return;
      }
      var linesLenght = editor.session.doc.$lines.length;
      if(event.end.row === linesLenght - 1 && event.start.column >= 4) {
        text = editor.getValue();
      } else {
        if(text !== editor.getValue()) {
          textReset = true;
          editor.setValue(text, 1);
        } else {
          textReset = false;
        }
      }
  });

  editor.setTheme("ace/theme/eclipse");

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
    inputConsole.style.height = this.component.parentElement.offsetHeight + "px";
    inputConsole.style.width = this.component.parentElement.offsetWidth + "px";

    inputConsole.style.top = this.component.parentElement.offsetTop + "px";
    inputConsole.style.left = this.component.parentElement.offsetLeft + "px";
  }

  return object
}

$ui.addExtension('Console', Console);
