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
    // FullScreen: 'framework/app-framework/wrappers/FullScreen/FullScreen', // Not need!
    PartitionScreen: 'framework/app-framework/wrappers/PartitionScreen/PartitionScreen',
    StateTreeManager: 'framework/app-framework/StateTree/StateTreeManager',
    Frame: 'framework/app-framework/wrappers/Frame/Frame',
    BasicFrame: 'framework/app-framework/wrappers/BasicFrame/BasicFrame',
    Encryption: 'framework/app-framework/encryption',
    SHA512: 'framework/app-framework/sha512',

    // App Template Helpers
    BaseContentScreen: 'framework/app-framework/templateHelpers/BaseContentScreen'
  },

  // Cache Buster.
  // urlArgs: "v=" + (new Date()).getTime()
});
