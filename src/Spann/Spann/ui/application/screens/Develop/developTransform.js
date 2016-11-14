define([], function () {
  // function uiTransform(item) {
  //   var object = dataTransform(item);
  //   object.target = "App/screens/Projects/ProjectEdit/screenProjectEdit";
  //   object.elementType = $ui.TreeElementType.ITEM;
  //   object.data = dataTransform(item);
  //   return [object];
  // }

  // function dataTransform(item) {
  //   return {
  //     name: item.items.name,
  //     uid: item.items.identity,
  //     files: item.items.details.files
  //   }
  // }

  function uiTransform(item) {
    return item.items.details.files.map(function (item) {
      var object = dataTransform(item);
      object.target = "App/screens/Develop/DevelopFile/screenDevelopFileEdit";
      object.elementType = $ui.TreeElementType.ITEM;
      object.data = dataTransform(item);
      return object;
    });
  }

  function dataTransform(item) {
    return {
      name: item.name,
      uid: item.identity,
      sourceCode: item.sourceCode
    }
  }

  return {
    uiTransform: uiTransform,
    dataTransform: dataTransform
  }
});
