function build() {
  var object = {};

  Object.defineProperty(object, 'clone', {
    value: function(item) {
      try {
        return JSON.parse(JSON.stringify(item));
      } catch(e) {}
    }
  });

  Object.defineProperty(object, 'isNullOrWhitespace', {
    value: function(item) {
      if (item === undefined || typeof item === 'undefined' || item == null) return true;
      if (typeof item !== 'string') return false;
      return item.replace(/\s/g, '').length < 1;
    }
  });

  return object;
};

var $utils = build();
