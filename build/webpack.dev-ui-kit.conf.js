const webpack = require('webpack');
const configurator = require('webpack-config');

module.exports = new configurator.default().extend('build/webpack.dev.conf.js').merge({
    devServer: {
        index: 'ui-kit.html',
    },
    plugins: [],
});