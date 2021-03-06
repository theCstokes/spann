define([
  'App/screens/Users/userTransform',
  'PartitionScreen'
], function(userTransform, PartitionScreen) {
  return function() {
    var screen = new PartitionScreen();

    screen.content = [
      {
        component: $ui.Panel,
        header: [
          {
            component: $ui.Label,
            caption: "Users"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus'
          }
        ],
        content: [
          {
            component: $ui.List,
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            id: 'userList',
            style: $ui.UserListItem
          }
        ]
      }
    ];

    screen.show = function(args) {
      var components = this.model;
      this.registerSelectionList(components.userList, API.USER_API,
        userTransform.uiTransform,
        userTransform.dataTransform);

      this.render = function(state) {

      }
    };

    return screen;
  }
});
