const isDev = process.env.NODE_ENV === 'development';
const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');
const { ProgressPlugin } = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const config = require('../../../../config');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: config.isDev,
                    extractCSS: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'],
        // alias: {
        //     vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
        // },
    },
    plugins: [
        new Dotenv({ path: resolve(__dirname, '..', '..', '..', '..', '.env') }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new ProgressPlugin(),
    ],
};
