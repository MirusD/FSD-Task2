const configurator = require('webpack-config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = new configurator.default().extend('build/webpack.base.conf.js').merge({
    mode: 'production',
    plugins: [],
});
