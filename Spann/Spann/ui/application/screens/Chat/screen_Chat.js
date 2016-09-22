define([
  'Screen',
  'App/screens/UserAdd/StateManager'
], function(Screen, StateManager) {
  return function() {
    var screen = new Screen();
    var manager = new StateManager(screen);

    screen.content = [
      {
        component: $ui.Editor
      }
    ];

    screen.show = function(data) {
      // console.log(data);
      // var components = this.model;
      //
      // components.msgList.addItem({
      //   name: "Message",
      //   type: "recived"
      // });
      //
      // var socket = new WebSocket("ws://" + location.host + "/api/v1/Chat/Notification");
      // socket.onmessage = function (event) {
      //   var data = JSON.parse(event.data);
      //   var items = data.map(function(obj) {
      //     return {
      //       name: obj.data,
      //       type: "recived"
      //     }
      //   });
      //   components.msgList.addItems(items);
      // }
      //
      // screen.render = function(state) {
      //
      // }
    };

    return screen;
  }
});
