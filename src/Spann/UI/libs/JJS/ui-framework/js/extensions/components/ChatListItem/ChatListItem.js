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
