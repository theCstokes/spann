var eng = {
  login: {
    create: "Create"
  }
};

var lang = eng;

var $T = function(path) {
  var items = path.split(".");
  var result = lang;
  items.every(function (name) {
    if(result.hasOwnProperty(name)) {
      result = result [name];
      return true;
    }
    console.log("No translation for item " + path);
    result = "";
    return false;
  });
  return result;
}