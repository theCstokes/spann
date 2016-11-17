define([], function() {
  function uiTransform(items) {
    return items.items.map(function (item) {
      var object = dataTransform(item);
      object.target = "App/screens/Projects/ProjectEdit/screenProjectEdit";
      object.elementType = $ui.TreeElementType.ITEM;
      object.data = dataTransform(item);
      return object;
    });
  }

  function dataTransform(item) {
    return {
      name: item.name,
      startFileName: item.startFileName,
      uid: item.identity
    }
  }

  return {
    uiTransform: uiTransform,
    dataTransform: dataTransform
  }
});
