module.exports = {
    quiet: true,
    logLevel: 'silent',
    clientLogLevel: 'silent',
    compress: false,
    historyApiFallback: true,
    noInfo: true,
    inline: true,
    open: false,
    overlay: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    stats: {
        colors: true,
        chunks: false,
    },
};
