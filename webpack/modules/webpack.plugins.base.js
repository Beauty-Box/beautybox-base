const isDev = process.env.NODE_ENV === 'development';
const { resolve } = require('path');
const { ProgressPlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve(process.cwd(), 'src'),
                options: {
                    hotReload: process.env.NODE_ENV === 'production',
                    extractCSS: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new ProgressPlugin(),
    ],
};
