const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(svg)(\?.*)?$/,
                exclude: /^((?!spriteSVG).)*$/,
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
            },
        ],
    },
    plugins: [
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
    ],
};
