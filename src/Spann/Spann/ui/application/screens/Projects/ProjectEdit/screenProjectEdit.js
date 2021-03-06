define([
  'BaseContentScreen',
  'App/screens/Projects/ProjectEdit/StateManager'
], function (BaseContentScreen, StateManager) {
  return function () {
    var screen = new BaseContentScreen();
    screen.content = [
      {
        component: $ui.Group,
        content: [
          {
            component: $ui.Input,
            id: 'projectInput',
            hint: 'Project Name',
            onChange: function (event) {
              event.target.screen.trigger('action', {
                action: 'attributeChange',
                data: {
                  name: event.target.model.value
                }
              });
            }
          },
          {
            component: $ui.Input,
            id: 'startUpInput',
            hint: 'Startup File Name',
            onChange: function (event) {
              event.target.screen.trigger('action', {
                action: 'attributeChange',
                data: {
                  startFileName: event.target.model.value
                }
              });
            }
          }
        ]
      }
    ];
    screen.topDock = [
      {
        component: $ui.Label,
        caption: "Project",
      },
      {
        component: $ui.ActionButton,
        icon: 'fa-trash',
        onClick: function() {
          // $data.delete({api: API.PROJECT_API, id: manager.getCurrentState().current.uid});
        }
      }
    ]
    screen.bottomActions = [
      {
        component: $ui.Button,
        id: "openButton",
        caption: "Open",
        icon: 'fa-folder-open',
        onClick: function (event) {
          $ui.clear();
          requirejs([
            'App/DevelopFrame/developFrame',
            'App/screens/Develop/screenDevelop'], function (projectFrame, screenDevelop) {
              $ui.addFrame(projectFrame);
              $ui.push(screenDevelop, {projectId: screen.stateManager.getCurrentState().current.uid});
            });
        }
      }
    ]
    var manager = new StateManager(screen);

    screen.registerEvent('show', function (data) {
      console.log(data);
      var components = this.model;

      screen.render = function (state) {
        components.projectInput.value = state.current.name;
        components.startUpInput.value = state.current.startFileName;

        //Update modified
        components.projectInput.modified = (state.current.name !== state.original.name);
        components.startUpInput.modified = (state.current.startFileName !== state.original.startFileName);
        screen.modified = components.projectInput.modified || components.startUpInput.modified;

        components.openButton.enabled = (!($utils.isNullOrWhitespace(state.current.name) 
        || $utils.isNullOrWhitespace(state.current.startFileName))) && !screen.editMode && !screen.modified;
      }
      manager.initialize(data);
    });

    return screen;
  }
});
