const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const configurator = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    theme: 'theme/'
};

const PAGES_DIR = `${PATHS.src}/pages`;
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));
const PAGES = [];

    fs.readdirSync(path.resolve(PAGES_DIR)).filter((file) => {
        return file.indexOf('base') !== 0;}).forEach((file) => {PAGES.push(file.split('/', 2));});


module.exports = new configurator.default().merge({
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src

    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: false
            }
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },{
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options:  {
                name: `${PATHS.assets}img/[name].[ext]`
            }
        },{
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true}
                },{
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: {path: `./postcss.config.js`}}
                },{
                    loader: 'sass-loader',
                    options: { sourceMap: true}
                }
            ]
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true}
                },{
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: {path: `./postcss.config.js`}}
                }
            ]
        }]
    },
    resolve: {
        alias: {
            '~': "src"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.theme}/fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/theme/favicon.png`, to: '' },
        ]),
        ...PAGES.map(fileName => new HtmlWebpackPlugin({
            getData: () => {
                try {
                    return JSON.parse(fs.readFileSync(`./src/pages/${fileName}/data.json`, 'utf8'));
                } catch (e) {
                    console.warn(`data.json was not provided for page ${fileName}`);
                    return {};
                }
            },
            filename: `${fileName}.html`,
            template: `./src/pages/${fileName}/${fileName}.pug`,
            alwaysWriteToDisk: true,
            inject: 'body',
            hash: true,})),
        new HtmlWebpackHarddiskPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
});