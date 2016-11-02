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
    updateHint();
  }

  function updateHint() {
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
        updateHint();
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
