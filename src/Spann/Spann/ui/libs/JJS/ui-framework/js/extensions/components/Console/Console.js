function Console(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-console');

  var inputConsole = $ui.create('div', object.component);
  inputConsole.addClass('input-console');
  inputConsole.id = "inputConsole_" + $utils.guid();
  inputConsole.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = new ace.edit(inputConsole.id);
  editor.set
  editor.setOptions({
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false
  });

  var code = null;
  var loc = 0;

  var MAX_HIST = 1000;

  var codeHist = [];
  var codeHistIndex = 0;

  var text = "Python Started.";
  var lineSeparater = "\n";
  var lineStart = ">>> ";
  var promptLength = 4;

  text += lineSeparater + lineStart;
  editor.setValue(text, 1);

  editor.commands.addCommand({
      name: "send",
      bindKey: {win: "Enter", mac: "Enter"},
      exec: function(editor) {
        var lines = editor.session.doc.$lines;
        var endIndex = lines.length - 1;
        var lastLine = lines[endIndex].replace(lineStart, "");

        if (lastLine[lastLine.length-1] == ':') {
          multiLineCallback(editor);
          return;
        }

        text = lines.reduce(function(result, item, idx) {
          if(idx >= endIndex - loc) {
            // result += lineSeparater;
            return result;
          }
          result += item + lineSeparater;
          return result;
        }, "");

        if (code == null) 
          code = lines[endIndex].replace(lineStart, "");
        else
          code += lines[endIndex].replace(lineStart, "");

        if(code === "execute order 66") {
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
          //text += lineStart + code + lineSeparater + lineStart;
          text += lineStart + code + lineSeparater;
          editor.setValue(text, 1);
          object._private.onCommandRun(code);

          codeHistIndex = -1;
          if (!$utils.isNullOrWhitespace(lastLine)) codeHist.push(lastLine);
          if (codeHist.length >= MAX_HIST) codeHist.pop();

          code = null;
          loc = 0;
        }
      }
    }
  );

  editor.commands.addCommand({
      name: "multiLine",
      bindKey: {win: "Shift-Enter", mac: "Shift-Enter"},
      exec: function(editor) {
        multiLineCallback(editor);
      }
    }
  );

  function multiLineCallback(editor) {
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

    if (code == null)
      code = lastLine + lineSeparater;
    else
      code += lastLine + lineSeparater;

    loc++;

    if (!$utils.isNullOrWhitespace(lastLine)) codeHist.push(lastLine);
    if (codeHist.length >= MAX_HIST) codeHist.pop();

    Object.model.insertLine();
  }


  editor.commands.addCommand({
      name: "codeHistoryPrev",
      bindKey: {win: "Up", mac: "Up"},
      exec: function(editor) {
        if (codeHistIndex < codeHist.length - 1)
          codeHistIndex++;
        else if (codeHist.length == 0)
          codeHistIndex = -1;

        text = consoleToString();

        var line = codeHist[codeHist.length - codeHistIndex - 1];
        if (codeHistIndex != -1)
          editor.setValue(text + lineStart + line, 1);

        console.log("hist index =", codeHistIndex);
      }
    }
  );

  editor.commands.addCommand({
      name: "codeHistoryNext",
      bindKey: {win: "Down", mac: "Down"},
      exec: function(editor) {
        var prevIndex = codeHistIndex;

        if (codeHistIndex > -1)
          codeHistIndex--;
        else if (codeHist.length == 0)
          codeHistIndex = -1;

        text = consoleToString();

        var line = codeHist[codeHist.length - codeHistIndex - 1];
        if (codeHistIndex == -1 && prevIndex != -1) {
          editor.setValue(text + lineStart, 1);
        } else if (codeHistIndex != -1) {
          editor.setValue(text + lineStart + line, 1);
        }

        console.log("hist index =", codeHistIndex);
        
      }
    }
  );

  editor.commands.addCommand({
    name: "clearConsole",
    bindKey: {win: "Ctrl+L", mac: "Cmd+L"},
    exec: function(editor) {
      editor.setValue(lineStart, 1);
      code = null;
      loc = 0;
    }
  });

  function consoleToString() {
    var lines = editor.session.doc.$lines;
    var endIndex = lines.length - 1;
    return lines.reduce(function(result, item, idx) {
      if(idx >= endIndex - loc) {
        return result;
      }
      result += item + lineSeparater;
      return result;
    }, "");
  }

  var textReset = false;
 
  editor.on("changeSelection", function(event) {
    var lines = editor.session.doc.$lines;
    var endIndex = lines.length - 1;

    var cursor = editor.selection.getCursor();
    if (cursor.row < endIndex) {
      console.log('readonly true');
      editor.setReadOnly(true);
    } else if (cursor.column < promptLength) {
      editor.navigateRight(1);
    } else if (editor.getReadOnly()) {
      console.log('readonly flase')
      editor.setReadOnly(false);
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

  Object.defineProperty(object.model, 'insertPrompt', {
    value: function() {
      text += lineStart;
      editor.setValue(text, 1);
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
      text += value + lineSeparater + lastLine;
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
