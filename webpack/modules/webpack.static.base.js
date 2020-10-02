module.exports = {
    module: {
        rules: [
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
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
                exclude: /spriteSVG/,
                loader: 'file-loader',
                options: {
                    name: 'assets/image/[name].[ext]',
                },
            },
        ],
    },
};
