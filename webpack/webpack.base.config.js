const path = require('path');
const Dotenv = require('dotenv-webpack');
const isDev = process.env.NODE_ENV === 'development';
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: {
        polyfill: '@babel/polyfill',
        main: [
            'webpack-hot-middleware/client?path=/cabinet/__webpack_hmr&timeout=20000&reload=true',
            path.resolve(__dirname, '..', 'src', 'main'),
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: isDev ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.esm.browser.js',
            '@crm': path.resolve(__dirname, '..', 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]',
                        },
                    },
                ],
            },
            // {
            //     test: /lib\/.+\..+(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'assets/lib/[path][name].[ext]'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif|jpeg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/image/[name].[ext]',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                            prependData: '@import "@crm/scss/variables.scss";',
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                            prependData: '@import "@crm/scss/variables.scss"',
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'assets/sprite.[hash:8].svg',
                        },
                    },
                    'svgo-loader',
                ],
                // include: svgList,
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new VueLoaderPlugin(),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new VuetifyLoaderPlugin(),
        new HtmlPlugin({
            inject: true,
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Beautybox CRM',
        }),
    ],
};
