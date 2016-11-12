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
