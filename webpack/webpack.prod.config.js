const merge = require('webpack-merge');
const { resolve } = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log('NODE ENV', process.env.NODE_ENV);

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: resolve(__dirname, '..', '..', 'dist', 'crm'),
        publicPath: '/',
        filename: 'assets/js/[name].bundle.[hash].js',
        chunkFilename: 'assets/js/[id].chunk.[hash].js',
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            }),
            new TerserPlugin({
                parallel: true,
                extractComments: true,
                sourceMap: false,
                terserOptions: {
                    comments: false,
                    compress: {
                        warnings: false,
                        drop_console: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `assets/js/npm.${packageName.replace('@', '')}`;
                    },
                },
                styles: {
                    test: /\.css$/,
                    name: 'styles',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    stats: {
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '' }],
        }),
        new webpack.EnvironmentPlugin(process.env.NODE_ENV),
        new MiniCSSExtractPlugin({
            ignoreOrder: true,
            allChunks: true,
            filename: 'assets/css/[name].[hash].css',
            chunkFilename: 'assets/css/[id].[hash].css',
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8,
        }),
        new webpack.HashedModuleIdsPlugin(),
    ],
});

module.exports = new Promise((resolve) => {
    resolve(buildWebpackConfig);
});
