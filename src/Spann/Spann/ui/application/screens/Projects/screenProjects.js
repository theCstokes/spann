define([
  'App/screens/Projects/projectTransform',
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
            caption: "Projects"
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus'
          }
        ],
        content: [
          {
            component: $ui.Tree,
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            id: 'projectList',
            style: $ui.FileListItem,
            items: [
              {
                elementType: $ui.TreeElementType.ITEM,
                name: "Home",
                selected: true,
                icon: "fa-home"
              }
            ]
          }
        ]
      }
    ];

    screen.show = function(args) {
      var components = this.model;
      this.registerSelectionList(components.userList, $data.sources.USER_API,
        userTransform.uiTransform,
        userTransform.dataTransform);

      this.render = function(state) {

      }
    };

    return screen;
  }
});
