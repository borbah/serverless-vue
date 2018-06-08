const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.conf.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'webpack-bundle-server.js',
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
});