const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  output: {
    filename: 'webpack-bundle-client.js',
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
});