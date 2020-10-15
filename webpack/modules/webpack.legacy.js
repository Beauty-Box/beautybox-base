module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: (file) => /[\\/]node_modules[\\/](!@beautybox)[\\/]/.test(file) && !/\.vue\.js/.test(file),
                options: {
                    cacheDirectory: true,
                    envName: 'legacy',
                },
            },
        ],
    },
};
