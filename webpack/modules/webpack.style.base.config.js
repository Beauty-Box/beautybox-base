const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const config = require('../../../../config');

module.exports = (module) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: config.isDev } },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: config.isDev },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: config.isDev,
                            additionalData: `@import "@${module}/scss/variables.scss";`,
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: config.isDev },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: config.isDev,
                            additionalData: `@import "@${module}/scss/variables.scss"`,
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },
});
