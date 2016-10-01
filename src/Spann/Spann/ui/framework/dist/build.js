/*! my-project-name - v1.0.0 - 2016-10-01 */
function BaseComponent(parent, screen) {
  var object = $ui.BaseExtension(parent, screen);
  object.component.addClass('ui-base-component');

  Object.defineProperty(object, 'noMargin', {
    set: function (value) {
      if(object._private.noMargin !== value) {
        object._private.noMargin = value;
        renderMargin();
      }
    },
    get: function() {
      return object._private.noMargin;
    }
  });

  function renderMargin() {
    if(!object._private.noMargin) {
      object.component.addClass('ui-base-component');
    } else {
      object.component.removeClass('ui-base-component');
    }
  }

  return object;
}

$ui.addExtension('BaseComponent', BaseComponent);

function BaseExtension(parent, screen) {
  var object = {
    model: {},
    component: {},
    elements: {},
    _private: {},
    screen: screen
  };

  var component = $ui.create(parent);
  object.component = component;

  object._private.name = undefined;
  Object.defineProperty(object.model, "id", {
    set: function(value) {
      object._private.name = value;
    },
    get: function() {
      return object._private.name;
    }
  });

  object._private.data = {};
  Object.defineProperty(object.model, "data", {
    set: function(value) {
      object._private.data = value;
    },
    get: function() {
      return object._private.data;
    }
  });

  Object.defineProperty(object.model, 'component', {
    set: function(value) {
      object.component = value;
    },
    get: function() {
      return object.component;
    }
  });

  return object;
}

$ui.addExtension('BaseExtension', BaseExtension);

function BaseHolder(parent, screen) {
  var object = $ui.BaseExtension(parent, screen);
  object.component.addClass('ui-holder');

  object._private.isContianer = false;
  object._private.containers = {};
  Object.defineProperty(object, 'addContainer', {
    value: function(name, item) {
      object._private.isContianer = true;
      if(item === undefined) {
        item = name;
        name = 'content';
      }
      // Add holder for building UI
      object._private.containers[name] = item;
    }
  });

  Object.defineProperty(object, 'isContianer', {
    get: function() {
      return object._private.isContianer;
    }
  });

  Object.defineProperty(object, 'containers', {
    get: function() {
        return object._private.containers;
    },
    enumerable: true
  });

  return object;
}

$ui.addExtension('BaseHolder', BaseHolder);

function ActionButton(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-action-button');

  var icon = $ui.create('div', object.component);
  icon.addClass('icon fa');

  if(object._private.icon != undefined) {
    icon.addClass(object._private.icon);
  } else {
    object._private.icon = "";
  }
  Object.defineProperty(object.model, "icon", {
    set: function(value) {
      if(object._private.icon != value) {
        icon.replaceClass(object._private.icon, value);
      }
    }
  });

  Object.defineProperty(object.model, "onClick", {
    set: function(callback) {
      object.component.onclick = callback;
    }
  });

  return object;
}

$ui.addExtension('ActionButton', ActionButton);

function BaseListOrTreeItem(panel, screen) {
  var object = $ui.BaseComponent(panel, screen);
  object.noMargin = true;
  object.component.addClass('ui-base-list-tree-item');
  object.content = object.component;

  object._private.expanded = false;
  Object.defineProperty(object.model, 'expand', {
    value: function() {
      if(object._private.expanded != false) {
        if(object.expandNode != undefined) {
          object.expandNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'colapse', {
    value: function() {
      if(object._private.expanded == false) {
        if(object.colapseNode != undefined) {
          object.colapseNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'clicked', {
    value: function() {
      if(!object._private.expanded) {
        if(object.expandNode != undefined) {
          object.expandNode();
        }
      }
    }
  });

  Object.defineProperty(object.model, 'select', {
    value: function() {
      object.content.click();
      onSelection();
    }
  });

  // Add selected property
  object._private.selected = false;
  Object.defineProperty(object.model, 'selected', {
    set: function (value) {
      if(object._private.selected != value) {
        object._private.selected = value;
        if(value) {
          object.component.addClass('selected');
          object.expandNode();
          onSelection();
        } else {
          object.component.removeClass('selected');
          object.colapseNode();
        }
      }
    },
    get: function() {
      return object._private.selected;
    }
  });

  object._private.onSelection;
  Object.defineProperty(object.model, 'onSelection', {
    set: function(value) {
      object._private.onSelectionCallback =  value;
    }
  });

  function onSelection() {
    if(object._private.onSelectionCallback !== undefined) {
      object._private.onSelectionCallback(object.model);
    }
  }

  $ui.register(object, 'expandNode', function() {
    object._private.expanded = true;
    // dropArrow.replaceClass('fa-chevron-left close', 'fa-chevron-down');
  });

  $ui.register(object, 'colapseNode', function() {
    object._private.expanded = false;
    // dropArrow.replaceClass('fa-chevron-down', 'fa-chevron-left closed');
  });

  return object;
}

$ui.addExtension('BaseListOrTreeItem', BaseListOrTreeItem);

function Button(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-button');

  var dec = $ui.UIDecorators(object);
  dec.string('caption', object.component);
  dec.icon('icon', object.component);

  Object.defineProperty(object.model, "onClick", {
    set: function(callback) {
      object.component.onclick = function(event) {
          callback.call(object.model, {event: event, target: object});
      }
    }
  });

  return object;
}

$ui.addExtension('Button', Button);

function ChatListItem(panel, screen) {
  var object = $ui.BaseComponent(panel, screen);
  object.component.addClass('ui-chat-list-item');

  object.component.scrollTop = object.component.scrollHeight;

  var line = $ui.create('div', object.component);
  line.addClass('line');

  var message = $ui.create('div', line);

  // Add type proptery
  if(object._private.type != undefined) {
    object._private.type = 'sent-item';
  } else {
    if(object._private.type == 'sent') {
      message.addClass('sent-item');
    } else if(object._private.type == 'recived') {
      message.addClass('recived-item');
    }
  }
  Object.defineProperty(object.model, 'type', {
    set: function(value) {
      if(value != object._private.type) {
        object._private.type = value;
        if(object._private.type == 'sent') {
          message.addClass('sent-item');
          message.removeClass('recived-item');
        } else if(object._private.type == 'recived') {
          message.addClass('recived-item');
          message.removeClass('sent-item');
        }
      }
    },
    get: function() {
      return object._private.type;
    }
  });

  // Add name property

  Object.defineProperty(object.model, 'name', {
    set: function(value) {
      message.textContent = value;
    },
    get: function() {
      return '';
    }
  })
  return object;
}

$ui.addExtension('ChatListItem', ChatListItem);

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
  var lineStart = ">>> ";
  text += lineSeparater + lineStart;
  editor.setValue(text, text.length - 1);

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
        editor.setValue(text, text.length - 1);
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
          editor.setValue(text, text.length - 1);
        } else {
          textReset = false;
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
      editor.setValue(text, text.length - 1);
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

  editor.commands.addCommand({
      name: "send",
      bindKey: {win: "Enter", mac: "Enter"},
      exec: function(editor) {
        console.log("GO Go GO!!")
        var data = "data = 123";
        editor.setValue(data, data.length - 1);
      }
  });

  editor.setTheme("ace/theme/twilight");

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

var EditorMode = {
  PYTHON: "ace/mode/python"
};

$ui.addStyleExtension('EditorMode', EditorMode);

function Input(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-input');

  var content = $ui.create('div', object.component);
  content.addClass('content');

  var hintCaption = $ui.create('div', content);
  hintCaption.addClass('hint');

  var input = $ui.create('input', content);
  input.addClass('inputCaption');

  var actionItem = $ui.create('div', object.component);
  actionItem.addClass('actionItem fa fa-times');

  if(object._private.hint != undefined) {
    input.placeholder = object._private.hint;
  }

  input.oninput = function(event) {
    object._private.value = input.value;
    if(object._private.onChange !== undefined) {
      object._private.onChange({event: event, target: object});
    }
    if(!$utils.isNullOrWhitespace(input.value)) {
      hintCaption.textContent = object._private.hint;
      hintCaption.addClass('has-hint');
      actionItem.addClass('has-action');
    } else {
      hintCaption.textContent = "";
      hintCaption.removeClass('has-hint');
      actionItem.removeClass('has-action');
    }
  }

  Object.defineProperty(object.model, 'onChange', {
    set: function(value) {
      object._private.onChange = value;
    }
  });

  Object.defineProperty(object.model, 'value', {
    set: function(value) {
      if(input.value !== value) {
        input.value =  value;
        object._private.value = value;
      }
    },
    get: function() {
      return object._private.value;
    }
  });

  Object.defineProperty(object.model, 'hint', {
    set: function(value) {
      if(object._private.hint !== value) {
        if(!$utils.isNullOrWhitespace(object._private.error)) {
          return;
        }
        object._private.hint = value;
        renderHint();
      }
    },
    get: function() {
      return object._private.hint;
    }
  });

  function renderHint() {
    hintCaption.textContent = object._private.hint;
    input.placeholder = object._private.hint;
  }

  if(object._private.type !==  undefined) {
    renderType();
  }

  Object.defineProperty(object.model, 'type', {
    set: function(value) {
      if(object._private.type !== value) {
        object._private.type = value;
        renderType();
      }
    },
    get: function() {
      return object._private.type;
    }
  });

  Object.defineProperty(object.model, 'hasError', {
    set: function(value) {
      object._private.hasError = value;
      renderHasError();
    },
    get: function() {
      return object._private.hasError;
    }
  });

  function renderHasError() {
    if(object._private.hasError) {
      object.component.addClass('has-error');
    } else {
      object.component.removeClass('has-error');
      renderHint();
    }
  }

  Object.defineProperty(object.model, 'error', {
    set: function(value) {
      if(object._private.error !== value) {
        if(!$utils.isNullOrWhitespace(value)) {
          object._private.hasError = true;
          object._private.error = value;
          input.placeholder = value;
        } else {
          object._private.hasError = false;
        }
        renderHasError();
      }
    },
    get: function () {
      return object._private.error;
    }
  })

  function renderType() {
    input.setAttribute('type', object._private.type);
  }

  return object;
}

$ui.addExtension('Input', Input);

function Label(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);

  if(object._private.caption !== undefined) {
    renderCaption();
  }

  Object.defineProperty(object.model, 'caption', {
    set: function(value) {
      if(object._private.caption !== value) {
        object._private.caption = value;
        renderCaption();
      }
    },
    get: function() {

    }
  });

  function renderCaption() {
    object.component.textContent = object._private.caption;
  }

  return object;
}

$ui.addExtension('Label', Label);

function List(parent, screen) {
  var object = $ui.BaseComponent(parent, screen);
  object.noMargin = true;
  object.component.addClass('ui-list');

  var listHolder = $ui.create('ul', object.component);
  listHolder.addClass('holder');

  object._private.listItems = [];

  Object.defineProperty(object.model, 'decorator', {
    set: function (value) {
      object.component.addClass(value);
    }
  });

  // Object.defineProperty(object.model, 'dataPropteryTransform', {
  //   set: function(value) {
  //     object._private.dataPropteryTransform = value;
  //   },
  //   get: function() {
  //     return object._private.dataPropteryTransform;
  //   }
  // })

  Object.defineProperty(object.model, 'items', {
    set: function(items) {
      addItems(items);
      console.log(object.component);
    },
    get: function() {
      return object._private.listItems.map(function(item) {
        return item.model;
      });
    }
  });

  Object.defineProperty(object.model, 'addItems', {
    value: function(item) {
      addItems(item);
    }
  });

  Object.defineProperty(object.model, 'addItem', {
    value: function(item) {
      addItems([item]);
    }
  });

  // object._private.position = "top";
  Object.defineProperty(object.model, 'position', {
    set: function (value) {
      object._private.position = value;
      setPosition();
    }
  });

  function setPosition() {
    if(object._private.position !== undefined) {
      var index = 0;

      if(object._private.position === 'top') {
        index = 0;
      } else if(object._private.position === 'bottom') {
        index = object._private.listItems.length - 1;
      }

      var item = object._private.listItems[index];
      if(item !== undefined && item.component !== undefined) {
        item.component.scrollIntoView();
      }
    }
  }

  function addItems(dataItems) {
    dataItems.forEach(function (value) {
      var item = $ui.create('li', listHolder);
      item.addClass('list-item');

      var element = object._private.style(item);
      if(element.hasOwnProperty('content') && element.content != undefined) {
        element.content.onclick = onClickCallback;
        element.content.index = object._private.listItems.length;
      } else {
        item.onclick = onClickCallback;
        item.index = object._private.listItems.length;
      }
      element.model.onSelection = object._private.onNodeSelection;
      for(var key in value) {
        element.model[key] = value[key];
      }
      object._private.listItems.push(element);
    });
    setPosition();
  }

  Object.defineProperty(object.model, "onClick", {
    set: function(value) {
      object._private.onClickCallback = value;
    }
  });

  Object.defineProperty(object.model, 'onSelection', {
    set: function(value) {
      object._private.onNodeSelection =  function(item) {
        object._private.selected = item;
        value(item);
      };
    }
  });

  Object.defineProperty(object.model, 'selected', {
    get: function() {
      return object._private.selected;
    }
  });

  Object.defineProperty(object.model, 'style', {
    set: function (value) {
      object._private.style = value;
    }
  });

  var onClickCallback = function(event){
    if(object._private.onClickCallback != undefined) {
      var targetIndex = event.currentTarget.index;
      var targetItem;
      object._private.listItems.forEach(function (item, index) {
        if(index === targetIndex) {
          item.model.selected = true;
          targetItem = item;
        } else {
          item.model.selected = false;
        }
      });
      object._private.onClickCallback({event: event, target: targetItem});
    }
  };

  object.show = function () {
    console.log('show');
    // this.component.style.height = "436px";
  }

  return object
}

$ui.addExtension('List', List);

var ListDecorators = {
  MAXIMIZE_LIST: "list-decorator max-list-item"
};

$ui.addStyleExtension('ListDecorators', ListDecorators);

function MessageTextBox(parent, screen) {
  //add base component data
  var object = $ui.BaseComponent(parent, screen);
  object.component.addClass('ui-message-textbox');

  var content = $ui.create('div', object.component);
  content.addClass('content');

  var hintItem = $ui.create('div', content);
  hintItem.addClass('hint');

  var inputField = $ui.create('input', content);
  inputField.addClass('inputField');

  var actionItem = $ui.create('div', object.component);
  actionItem.addClass('actionItem fa fa-times');

  object._private.hint = "Username";
  if(object._private.hint != undefined) {
    inputField.placeholder = object._private.hint;
  }

  inputField.oninput = function(event) {
    console.log(event);
    if(!$utils.isNullOrWhitespace(inputField.value)) {
      hintItem.textContent = object._private.hint;
      hintItem.addClass('has-hint');
    } else {
      hintItem.textContent = "";
      hintItem.removeClass('has-hint');
    }
  }

  return object;
}

$ui.addExtension('MessageTextBox', MessageTextBox);

function NavigationListItem(panel, screen) {
  var object = $ui.BaseListOrTreeItem(panel, screen);
  object.noMargin = true;
  object.component.addClass('ui-navigation-list-item');

  object.content = $ui.create('div', object.component);
  object.content.addClass('content');

  var icon = $ui.create('i', object.content);
  icon.addClass('item-icon fa');

  var item = $ui.create('div', object.content);
  item.addClass('name');

  var dropArrow  = $ui.create('i', object.component);
  dropArrow.addClass('drop-arrow fa fa-chevron-left closed');
  dropArrow.onclick = function() {
    if(object._private.expanded) {
      object.colapseNode();
    } else {
      object.expandNode();
    }
  }

  Object.defineProperty(object.model, 'name', {
    set: function(value) {
      if(object._private.name != value) {
        object._private.name = value;
        item.textContent = value;
      }
    },
    get: function() {
      return object._private.name;
    }
  });

  Object.defineProperty(object.model, 'icon', {
    set: function(type) {
      icon.addClass(type);
    }
  });

  //Override  node properties
  $ui.register(object, 'expandNode', function() {
    object._private.expanded = true;
    dropArrow.replaceClass('fa-chevron-left close', 'fa-chevron-down');
  });

  $ui.register(object, 'colapseNode', function() {
    object._private.expanded = false;
    dropArrow.replaceClass('fa-chevron-down', 'fa-chevron-left closed');
  });

  Object.defineProperty(object.model, 'target', {
    set: function(value) {
      object._private.target = value;
    },
    get: function() {
      return object._private.target;
    }
  })

  return object;
}

$ui.addExtension('NavigationListItem', NavigationListItem);

function ProgressBar(parent, screen) {

  var object = $ui.BaseComponent(parent, screen);

  // Create progress bar holder
  var item = $ui.create(object.component);
  item.addClass('progress-bar')

  var holder = $ui.create(item);
  holder.addClass('holder');

  var clearBar = $ui.create(holder);
  clearBar.addClass('clear-bar');

  var bar = $ui.create(holder);
  bar.addClass('overlay-bar');

  object._private.width = 0;
  bar.style.width = object._private.width + '%';

  Object.defineProperty(object.model, 'runTo', {
    value: function(percent) {
      var endPoint = (percent / 100) * 100;
      if(object._private.width >= endPoint) {
        object._private.width = 0;
      }
      var id = setInterval(frame, 10);
      function frame() {
          if (object._private.width >= endPoint) {
              clearInterval(id);
          } else {
              object._private.width++;
              bar.style.width = object._private.width + '%';
          }
      }
    }
  });

  Object.defineProperty(object.model, 'start', {
    set: function (value) {
      object._private.width = value;
    }
  });

  return object;
}

$ui.addExtension('ProgressBar', ProgressBar);

function UIDecorators(object) {
  function string(name, parent) {
    var item = $ui.create('div', parent);
    item.addClass('ui-decorators-string');
    if(object[name] !== undefined) {
      object._private[name] = object[name];
    }
    renderStringItem();
    Object.defineProperty(object.model, name, {
      set: function(value) {
        if(object._private[name] !== value) {
          object._private[name] = value;
          renderStringItem();
        }
      },
      get: function() {
        return object._private[name];
      }
    });
    function renderStringItem() {
      item.textContent = object._private[name];
    }
    return item;
  }

  function icon(name, parent) {
    var icon = $ui.create('div', parent);
    icon.addClass('ui-decorators-icon fa');
    if(object[name] !== undefined) {
      renderIcon(object[name]);
      object._private.icon = object[name];
    }
    Object.defineProperty(object.model, name, {
      set: function (value) {
        if(object._private.icon != value) {
          renderIcon(value);
          object._private.icon = value;
        }
      },
      get: function() {
        return object._private.icon;
      }
    });

    function renderIcon(newValue) {
      if(object._private.icon !== undefined) {
        icon.replaceClass(object._private.icon, value);
      } else {
        icon.addClass(newValue);
      }
    }
  }

  return {
    string: string,
    icon: icon
  }
}

$ui.addExtension('UIDecorators', UIDecorators);

function UserListItem(parent, screen) {
  var object = $ui.BaseListOrTreeItem(parent, screen);
  object.component.addClass('ui-user-list-item');

  object.content = $ui.create('div', object.component);
  object.content.addClass('content');

  var icon = $ui.create('i', object.content);
  icon.addClass('item-icon fa');

  var item = $ui.create('div', object.content);
  item.addClass('name');

  var dropArrow  = $ui.create('i', object.component);
  dropArrow.addClass('drop-arrow fa closed');
  dropArrow.onclick = function() {
    if(object._private.expanded) {
      object.colapseNode();
    } else {
      object.expandNode();
    }
  }

  Object.defineProperty(object.model, 'name', {
    set: function(value) {
      if(object._private.name != value) {
        object._private.name = value;
        item.textContent = value;
      }
    },
    get: function() {
      return object._private.name;
    }
  });

  Object.defineProperty(object.model, 'icon', {
    set: function(type) {
      icon.addClass(type);
    }
  });

  //Override  node properties
  // $ui.register(object, 'expandNode', function() {
  //   object._private.expanded = true;
  //   // dropArrow.replaceClass('fa-chevron-left close', 'fa-chevron-down');
  // });
  //
  // $ui.register(object, 'colapseNode', function() {
  //   object._private.expanded = false;
  //   // dropArrow.replaceClass('fa-chevron-down', 'fa-chevron-left closed');
  // });

  Object.defineProperty(object.model, 'target', {
    set: function(value) {
      object._private.target = value;
    },
    get: function() {
      return object._private.target;
    }
  })

  return object;
}

$ui.addExtension('UserListItem', UserListItem);

function Dialog(parent, screen) {
  var item = document.createElement('div');
  item.className += ' modal';
  parent.appendChild(item);

  //add base component data
  var component = $ui.BaseComponent(item, screen);
  var object = component.object;

  var panelItem = document.createElement('div');
  item.appendChild(panelItem);
  panelItem.className += ' modal-content';

  var headerItem = document.createElement('div');
  headerItem.className += ' modal-header';
  panelItem.appendChild(headerItem);

  var spanItem = document.createElement('span');
  spanItem.className += ' close';
  spanItem.innerHTML += "×";
  headerItem.appendChild(spanItem);

  var headerData = document.createElement('h2');
  headerData.innerHTML += "Test Header";
  headerItem.appendChild(headerData);

  var bodyItem = document.createElement('div');
  bodyItem.className += ' modal-body';
  panelItem.appendChild(bodyItem);

  var bodyData = document.createElement('h3');
  bodyData.innerHTML += "Some data and stuff";
  bodyItem.appendChild(bodyData);

  var footerItem = document.createElement('div');
  footerItem.className += ' modal-footer';
  panelItem.appendChild(footerItem);

  var footerData = document.createElement('h3');
  footerData.innerHTML += "Footer";
  footerItem.appendChild(footerData);

  // When the user clicks on <span> (x), close the modal
  spanItem.onclick = function() {
      item.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == item) {
          item.style.display = "none";
      }
  }

  Object.defineProperty(object, 'open', {
    value: function (event) {
      item.style.display = "block";
    }
  });

  return object;
}

$ui.addExtension('Dialog', Dialog);

function Flow(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-flow');
  object.addContainer(object.component);

  Object.defineProperty(object.model, 'size', {
    set: function () {
      console.log('size');
      console.log(object.component);
      object.component.addClass('half');
    }
  });

  if(object.rightToLeft != undefined) {
    object._private.rightToLeft = object.rightToLeft;
  } else {
    object._private.rightToLeft = false;
  }
  renderLayoutOrder();
  Object.defineProperty(object.model, 'rightToLeft', {
    set: function (value) {
      if(object._private.rightToLeft !== value) {
        object._private.rightToLeft = value;
        renderLayoutOrder();
      }
    }
  });
  function renderLayoutOrder() {
    if(object._private.rightToLeft) {
      object.component.replaceClass('left-to-right', 'right-to-left');
    } else {
      object.component.replaceClass('right-to-left', 'left-to-right');
    }
  }

  return object;
}

$ui.addExtension('Flow', Flow);

function Frame(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-frame');

  var topBar = $ui.create(object.component);
  object.addContainer('topBar', topBar);
  topBar.addClass('topBar');

  var leftBar = $ui.create(object.component);
  object.addContainer('leftBar', leftBar);
  leftBar.addClass('leftBar');

  var holderContent = $ui.create(object.component);
  holderContent.addClass('holder');

  var mainContent = $ui.create(holderContent);
  object.addContainer('mainContent', mainContent);
  mainContent.addClass('mainContent');

  return object;
}
$ui.addExtension('Frame', Frame);

function Group(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-group');
  object.addContainer(object.component);

  Object.defineProperty(object.model, 'size', {
    set: function () {
      console.log('size');
      console.log(object.component);
      object.component.addClass('half');
    }
  });

  Object.defineProperty(object.model, 'backgroudImage', {
    set: function (value) {
      if(object._private.backgroudImage !== value) {
        object._private.backgroudImage = value;
        object.component.style.background = "url(" + value + ")";
        object.component.addClass('background-image');
      }
    }
  })

  return object;
}

$ui.addExtension('Group', Group);

function Login(parent, screen) {
  // parent.addClass('ui-background-image');
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-login');

  object.component.addClass('image');

  var credentials = $ui.create(object.component);
  credentials.addClass('credentials');
  object.addContainer(credentials);

  Object.defineProperty(object.model, 'backgroudImage', {
    set: function (value) {
      if(object._private.backgroudImage !== value) {
        object._private.backgroudImage = value;
        object.component.style.backgroundImage = "url(" + value + ")";
      }
    }
  })

  return object;
}

$ui.addExtension('Login', Login);

function Panel(parent, screen) {
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-panel');

  var header = $ui.create(object.component);
  header.addClass('header hasHeader');
  // header.textContent = "test";
  // This adds holder for ui builder
  object.addContainer('header', header);

  var body = $ui.create(object.component);
  body.addClass('body');
  object.addContainer(body);

  var bottomDock = $ui.create(object.component);
  bottomDock.addClass('bottom-dock');
  object.addContainer('bottomDock', bottomDock);

  Object.defineProperty(object.model, "bottomDock", {
    set: function (value) {
      console.log(value);
      if(value !== undefined) {
        bottomDock.addClass('has-bottom-dock');
      } else {
        bottomDock.removeClass('has-bottom-dock');
      }
    }
  });

  object._private.showHeaderBar = true;
  Object.defineProperty(object.model, "showHeaderBar", {
    set: function (value) {
      object._private.showHeaderBar = value;
      if(value) {
        header.addClass('hasHeader');
      } else {
        header.removeClass('hasHeader');
      }
    },
    get: function () {
      return object._private.showHeaderBar;
    }
  });

  object._private.showFooterBar = false;
  Object.defineProperty(object.model, "showFooterBar", {
    set: function (value) {
      object._private.showFooterBar = value;
      if(value) {
        object.elements.header.addClass('hasFooter');
      } else {
        object.elements.header.removeClass('hasFooter');
      }
    },
    get: function () {
      return object._private.showFooterBar;
    }
  });

  return object;
}

$ui.addExtension('Panel', Panel);

function PartitionScreen(parent, screen) {
  var object = $ui.BaseHolder(parent);
  object.component.addClass('ui-partition-screen', screen);

  var leftBar = $ui.create(object.component);
  object.addContainer('leftSide', leftBar);
  leftBar.addClass('left-side');

  var holderContent = $ui.create(object.component);
  holderContent.addClass('holder');

  var mainContent = $ui.create(holderContent);
  object.addContainer('rightSide', mainContent);
  mainContent.addClass('right-side');

  return object;
}
$ui.addExtension('PartitionScreen', PartitionScreen);
