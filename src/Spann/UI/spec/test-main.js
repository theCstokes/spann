var TEST_REGEXP = /(spec|test)\.js$/i;
var tests = [];

for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
        tests.push(file);
    }
}



requirejs.config({

    // Karma serves files from '/base'

    baseUrl: '/base',

    // ask Require.js to load these files (all our tests)

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
      Login: 'framework/app-framework/wrappers/Login/Login',
      PartitionScreen: 'framework/app-framework/wrappers/PartitionScreen/PartitionScreen',
      StateTreeManager: 'framework/app-framework/StateTree/StateTreeManager',
      Frame: 'framework/app-framework/wrappers/Frame/Frame',
      Encryption: 'framework/app-framework/encryption',
      SHA512: 'framework/app-framework/sha512',

      // App Template Helpers
      BaseContentScreen: 'framework/app-framework/templateHelpers/BaseContentScreen'
    },

    deps: tests,

    // start test run, once Require.js is done

    callback: window.__karma__.start

});
