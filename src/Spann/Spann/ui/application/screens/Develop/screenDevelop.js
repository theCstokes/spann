define([
  'PartitionScreen',
  'App/screens/Develop/StateManager',
  'App/screens/Develop/developTransform',
  'App/screens/Develop/FileDialog/fileDialog',
  'DataSocket',
  'App/screens/Common/dockScreen_Output'
], function (PartitionScreen, StateManager, developTransform, fileDialog, DataSocket, dockScreen_Output) {
  return function () {
    var dialogOpen = false;
    var dataSocket = new DataSocket(API.PROJECT_RUN_API);
    var screen = new PartitionScreen();
    screen.content = [
      {
        component: $ui.Panel,
        id: 'status',
        topDock: [
          {
            component: $ui.Label,
            id: 'projectLabel'
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-plus',
            onClick: function () {
              $ui.push(fileDialog);
            }
          },
          {
            component: $ui.ActionButton,
            icon: 'fa-play',
            onClick: function (event) {
              if (dataSocket.isOpen) {
                dataSocket.send(screen.stateManager.getCurrentState().current);
              } else {
                dataSocket.start();
                dataSocket.send(screen.stateManager.getCurrentState().current);
              }
              screen.trigger("saveRequest");
              $ui.notifyEvent("refreshFile");
            }
          }
        ],
        content: [
          {
            component: $ui.Tree,
            id: "fileTree",
            decorator: $ui.ListDecorators.MAXIMIZE_LIST,
            style: $ui.FileListItem,
            nodeStyle: $ui.FolderListItem
          }
        ]
      }
    ];
    var manager = new StateManager(screen);

    dataSocket.onMessage = function (event) {
      data = event.data;
      if (data === undefined) return;

      if (!dialogOpen) {
        $ui.push(dockScreen_Output, data);
        dialogOpen = true;
      } else {
        $ui.notifyEvent("updateOutput", data);
      }
    }

    screen.registerEvent('show', function (args) {

      var d = new Date();
      console.log("show left", d.getTime());

      var components = this.model;

      $ui.addEvent('addNewFile', function (data) {
        screen.trigger('action', {
          action: 'addFile',
          data: data
        });
        screen.trigger("saveRequest", {}, function (event) {
          $ui.popTo($ui.frame);
          requirejs([
            'App/screens/Develop/screenDevelop'], function (screenDevelop) {
              $ui.push(screenDevelop, { projectId: screen.stateManager.getCurrentState().current.uid });
              console.log(screen);
            });

        });
        console.log('data', data, components);
      });

      $ui.addEvent("closedOutput", function () {
        dialogOpen = false;
      });

      $ui.addEvent("updateFie", function (data) {
        screen.trigger('action', {
          action: 'updateFile',
          data: data
        })
      });

      screen.render = function (state) {
        var d = new Date();
        console.log("render left", d.getTime());
        
        if (JSON.stringify(state.current) !== JSON.stringify(state.original)) {
          components.projectLabel.caption = state.current.name + "*";
        } else {
          components.projectLabel.caption = state.current.name;
        }

        // Update modified.
        components.projectLabel.modified = (state.current.name !== state.original.name);
        state.current.files.forEach(function (item, idx) {
          var file = components.fileTree.items.find(function (file) {
            return file.data.uid === item.uid;
          });
          if (file !== undefined) {
            file.data.sourceCode = item.sourceCode;
            if (idx < state.original.files.length && item.sourceCode !== state.original.files[idx].sourceCode) {
              file.name = item.name + "*";
            } else {
              file.name = item.name;
            }
          }
        });
        // component.fileTree
      }
      console.log("send", d.getTime());
      this.registerSelectionList(
        components.fileTree,
        API.PROJECT_API,
        function (data) {
          console.log("get", d.getTime());
          var files = [];
          if (data.items.hasOwnProperty('details')) {
            if (data.items.details.hasOwnProperty('files')) {
              files = data.items.details.files;
              files = files.reduce(function (result, item) {
                result.push({
                  name: item.name,
                  uid: item.identity,
                  sourceCode: item.sourceCode
                });
                return result;
              }, []);
            }
          }
          var proj = {
            name: data.items.name,
            uid: data.items.identity,
            startFileName: data.items.startFileName,
            files: files
          }
          manager.initialize(proj);
          return developTransform.uiTransform(data);
        },
        developTransform.dataTransform,
        {
          id: args.projectId
        }
      );
    });
    return screen;
  }
});
