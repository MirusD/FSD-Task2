const webpack = require('webpack');
const configurator = require('webpack-config');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = new configurator.default().extend('build/webpack.base.conf.js').merge({
    mode: 'development',
    devtool: 'cheap -module-eval-source-map',
    devServer: {
        stats: 'errors-only',
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8081,
        overlay: {
            warning: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
});