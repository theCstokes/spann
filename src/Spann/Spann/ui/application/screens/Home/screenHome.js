define([
  'Screen'
], function(Screen) {
  return function() {
    var screen = new Screen();

    screen.content = [
        {
          component: $ui.Panel,
          showTopDock: false,
          content: [
            {
              component: $ui.Label,
              caption: 'Welcome %USERNAME% to Spann, the online Python IDE!',
              theme: 'x'
            }
          ]
        }
      ];


    return screen;
  }
});
