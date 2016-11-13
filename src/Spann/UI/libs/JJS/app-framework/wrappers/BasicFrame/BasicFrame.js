define([
  'Wrappers/base/BaseWrapper'
], function(BaseWrapper) {

  function BasicFrame() {
    var object = new BaseWrapper($ui.BasicFrame);
    object.addOwner('mainContent');

    return object;
  }

  return BasicFrame
});
