const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = (module = '') => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: isDev },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
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
                        options: { sourceMap: isDev },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                            additionalData: `@import "@${module}/scss/variables.scss"`,
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },
});
