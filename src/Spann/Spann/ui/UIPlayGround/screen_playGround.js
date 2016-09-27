define([
  'Screen'
], function(Screen) {
  return function() {
    var screen = new Screen();

    screen.content = [
      {
        component: $ui.Panel,
        content: [
          {
            component: $ui.Editor,
            mode: $ui.EditorMode.PYTHON
          }
        ]
      }
    ];

    screen.show = function() {
      console.log(this);
    }

    return screen;
  }
});
