define([
  'Screen',
  'App/screens/Fiddle/dockScreen_Output'
], function(Screen, dockScreen_Output) {
  return function() {
    var screen = new Screen();

    screen.content = [
        {
          component: $ui.Label,
          caption: 'Welcome %USERNAME% to Spann, the online Python IDE!',
          theme: 'x'
        }
      ];

    screen.show = function(args) {

    }

    return screen;
  }
});
