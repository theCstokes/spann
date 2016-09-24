define([
  'Screen'
], function(Screen) {
  return function() {
    var screen = new Screen();

    screen.content = [
        {
          component: $ui.Panel,
          id: "mainPanel",
          header: [
            {
              component: $ui.Label,
              caption: "Home"
            }
          ],
          content: [
            {
              component: $ui.Label,
              caption: "Hello World"
            },
            {
              component: $ui.Input,
              id: 'messageInput',
              hint: 'Name'
              // type: 'text'
            },
            {
              component: $ui.ProgressBar,
              id: "bar"
            },
            {
              component: $ui.Button,
              id: "runButton",
              value: "Check",
              icon: 'fa-check',
              onClick: function(ee) {
                screen.showStuff.open(true);
              }
            },
            {
              component: $ui.List,
              style: $ui.ChatListItem,
              items: [
                {
                  name: "Test 1",
                  type: "sent"
                },
                {
                  name: "Test 2",
                  type: "recived"
                }
              ],
              onClick: function(event) {
                var inputName = $ui.topScreen.messageInput.value;
                var user = { name: inputName };

                $data.send($data.SEND_TYPES.POST, {api: "User"}, user, function(event) {
                  console.log(event);
                });
              }
            }
          ]
        }
      ];

    screen.show = function(args) {

    }

    return screen;
  }
});
