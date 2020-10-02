const { resolve } = require('path');

module.exports = {
    contentBase: resolve(__dirname, '..', 'public'),
    contentBasePublicPath: '/cabinet/',
    quiet: true,
    logLevel: 'silent',
    clientLogLevel: 'silent',
    compress: false,
    historyApiFallback: true,
    progress: true,
    noInfo: true,
    inline: true,
    hot: true,
    reload: true,
    open: false,
    overlay: true,
    host: 'localhost',
    port: 8080,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    stats: {
        colors: true,
        chunks: false,
    },
    before() {
        console.log('build crm');
    },
};
