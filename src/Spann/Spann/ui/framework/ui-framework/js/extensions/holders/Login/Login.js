function Login(parent, screen) {
  // parent.addClass('ui-background-image');
  var object = $ui.BaseHolder(parent, screen);
  object.component.addClass('ui-login');

  object.component.addClass('image');

  var credentials = $ui.create(object.component);
  credentials.addClass('credentials');
  object.addContainer(credentials);

  Object.defineProperty(object.model, 'backgroundImage', {
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
