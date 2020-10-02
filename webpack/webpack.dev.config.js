const { resolve } = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: resolve(__dirname, '..', 'dist'),
        publicPath: '/cabinet/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[id].chunk.js',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            LANG: JSON.stringify('ru'),
        }),
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    stats: {
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
});

module.exports = devWebpackConfig;
