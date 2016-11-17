function Editor(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-editor');

  var inputEditor = $ui.create('div', object.component);
  inputEditor.addClass('input-editor');
  inputEditor.id = "inputEditor_" + $utils.guid();
  inputEditor.style.media = "screen";

  ace.require("libs/ace/src-min-noconflict/ext-language_tools.js");
  var editor = new ace.edit(inputEditor.id);
  editor.setOptions({
    enableBasicAutocompletion: true
  });

  editor.setTheme("ace/theme/eclipse");

  object._private.lastValue = "";
  object._private.hasBeenUpdated = false;
  Object.defineProperty(object.model, 'value', {
    get: function () {
      return editor.getValue();
    },
    set: function (value) {
      if(object._private.lastValue !== value) {
        object._private.hasBeenUpdated = true;
        editor.setValue(value, 1);
      }
    }
  });

  Object.defineProperty(object.model, 'mode', {
    set: function (value) {
      if (object._private.mode !== value) {
        object._private.mode = value;
        editor.session.setMode(value);
      }
    },
    get: function () {
      return object._private.mode;
    }
  });

  object._private.onChange = undefined;
  Object.defineProperty(object.model, 'onChange', {
    get: function () {
      return object._private.onChange;
    },
    set: function (value) {
      object._private.onChange = value;
    }
  });

  editor.on("change", function (event) {
    if(object._private.hasBeenUpdated) {
      object._private.hasBeenUpdated = false;
      return;
    }
    if (object._private.onChange !== undefined) {
      var currentValue = editor.getValue();
      if (currentValue !== object._private.lastValue) {
        object._private.lastValue = currentValue;
        object._private.onChange({
          value: currentValue,
          event: event,
          target: editor
        });
      }
    }
  });

  object.show = function () {
    console.log("show editor");
    inputEditor.style.height = this.component.parentElement.offsetHeight + "px";
    inputEditor.style.width = this.component.parentElement.offsetWidth + "px";

    inputEditor.style.top = this.component.parentElement.offsetTop + "px";
    inputEditor.style.left = this.component.parentElement.offsetLeft + "px";
  }

  return object
}

$ui.addExtension('Editor', Editor);
