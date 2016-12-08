requirejs.config({
  // baseUrl: '', //TODO - if need new base directory.
  paths: {
    // App Directory.
    App: 'application',

    // UI PLay Group Directory.
    PlayGroup: 'UIPlayGround',

    // UI Framework Directory.
    Framework: 'libs/JJS',

    Async: 'node_modules/async/lib/async',

    // App Wrappers.
    Wrappers: 'libs/JJS/app-framework/wrappers',
    Screen: 'libs/JJS/app-framework/wrappers/Screen/Screen',
    StateDialog: 'libs/JJS/app-framework/wrappers/StateDialog/StateDialog',
    DockScreen: 'libs/JJS/app-framework/wrappers/DockScreen/DockScreen',
    ContextMenu: 'libs/JJS/app-framework/wrappers/ContextMenu/ContextMenu',
    FullScreen: 'libs/JJS/app-framework/wrappers/FullScreen/FullScreen', // Not need!
    PartitionScreen: 'libs/JJS/app-framework/wrappers/PartitionScreen/PartitionScreen',
    BaseContentScreen: 'libs/JJS/app-framework/wrappers/BaseContentScreen/BaseContentScreen',
    StateTreeManager: 'libs/JJS/app-framework/StateTree/StateTreeManager',
    Frame: 'libs/JJS/app-framework/wrappers/Frame/Frame',
    BasicFrame: 'libs/JJS/app-framework/wrappers/BasicFrame/BasicFrame',
    Encryption: 'application/utils/encryption',
    SHA512: 'application/utils/sha512',
    DataSocket: 'libs/JJS/app-framework/DataSocket'
  },

  // Cache Buster.
  urlArgs: "v=" + (new Date()).getTime()
});
