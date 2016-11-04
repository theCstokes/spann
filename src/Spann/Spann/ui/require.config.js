requirejs.config({
  // baseUrl: '', //TODO - if need new base directory.
  paths: {
    // App Directory.
    App: 'application',

    // UI PLay Group Directory.
    PlayGroup: 'UIPlayGround',

    // UI Framework Directory.
    Framework: 'framework',

    // App Wrappers.
    Wrappers: 'framework/app-framework/wrappers',
    Screen: 'framework/app-framework/wrappers/Screen/Screen',
    StateDialog: 'framework/app-framework/wrappers/StateDialog/StateDialog',
    DockScreen: 'framework/app-framework/wrappers/DockScreen/DockScreen',
    ContextMenu: 'framework/app-framework/wrappers/ContextMenu/ContextMenu',
    FullScreen: 'framework/app-framework/wrappers/FullScreen/FullScreen', // Not need!
    PartitionScreen: 'framework/app-framework/wrappers/PartitionScreen/PartitionScreen',
    BaseContentScreen: 'framework/app-framework/wrappers/BaseContentScreen/BaseContentScreen',
    StateTreeManager: 'framework/app-framework/StateTree/StateTreeManager',
    Frame: 'framework/app-framework/wrappers/Frame/Frame',
    BasicFrame: 'framework/app-framework/wrappers/BasicFrame/BasicFrame',
    Encryption: 'framework/app-framework/encryption',
    SHA512: 'framework/app-framework/sha512'
  },

  // Cache Buster.
  urlArgs: "v=" + (new Date()).getTime()
});
