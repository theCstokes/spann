define([
  'Screen',
  'App/screens/UserAdd/StateManager'
], function(Screen, StateManager) {
  return function() {
    var screen = new Screen();
    var manager = new StateManager(screen);

    screen.content = [
      {
        component: $ui.Panel,
        id: "NewUserPanel",
        header: [
          {
            component: $ui.Label,
            caption: "Chat"
          }
        ],
        content: [
          {
            component: $ui.Input,
            id: 'msg',
            hint: 'Message',
          },
          {
            component: $ui.Button,
            id: "sendButton",
            caption: "Send",
            onClick: function(event) {
              console.log(event);
              var data = {
                sendingUserID: 61,
                receivingUserID: 63,
                data: "123123123123123 BOB"
              }
              $data.send($data.SEND_TYPES.POST, {api: "Chat/Message"}, data, function(event) {
                console.log(event);
              });
            }
          }
        ]
      }
    ];

    screen.show = function(data) {
      console.log(data);
      var components = this.model;
      var searchHeader = {
        items: [
          {
            property: 'sendingUserID',
            comparison: 'eq',
            value: 61
          },
          {
            property: 'receivingUserID',
            comparison: 'eq',
            value: 63
          }
        ]
      };

      $data.get( {api: "Chat/Message"}, {SearchHeader: searchHeader}, function(event) {
        console.log(event);
        components.msg.value = JSON.stringify(event);
      });
      screen.render = function(state) {

      }
    };

    return screen;
  }
});
