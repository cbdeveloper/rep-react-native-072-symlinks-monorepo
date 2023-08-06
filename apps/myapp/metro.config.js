const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // OPTION 1 - DOES NOT WORK
  // resolver: {
  //   unstable_enableSymlinks: true,
  // },

  // OPTION 2 - WORKS
  watchFolders: [
    path.resolve(__dirname, './node_modules/@my-app/foo')
  ]
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
