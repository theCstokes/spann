requirejs.config({
  // baseUrl: '', //TODO - if need new base directory.
  paths: {
    // App Directory.
    App: 'application',

    // UI Framework Directory.
    Framework: 'framework',

    // App Wrappers.
    Wrappers: 'framework/app-framework/wrappers',
    Screen: 'framework/app-framework/wrappers/Screen/Screen',
    Login: 'framework/app-framework/wrappers/Login/Login',
    PartitionScreen: 'framework/app-framework/wrappers/PartitionScreen/PartitionScreen',
    StateTreeManager: 'framework/app-framework/StateTree/StateTreeManager',
    Frame: 'framework/app-framework/wrappers/Frame/Frame',

    // App Template Helpers
    BaseContentScreen: 'framework/app-framework/templateHelpers/BaseContentScreen'
  },

  // Cache Buster.
  // urlArgs: "v=" + (new Date()).getTime()
});
