define([], function() {
  function uiTransform(items) {
    return items.items.map(function (item) {
      var object = dataTransform(item);
      object.target = "App/screens/UserAdd/screen_NewUser";
      object.data = dataTransform(item);
      return object;
    });
  }

  function dataTransform(item) {
    return {
      name: item.name,
      password: item.password,
      uid: item.identity
    }
  }

  return {
    uiTransform: uiTransform,
    dataTransform: dataTransform
  }
});
