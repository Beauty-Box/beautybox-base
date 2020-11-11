const { resolve } = require('path');

module.exports = {
    entry: {
        'main': resolve(process.cwd(), 'src', 'main'),
    },
    resolve: {
        alias: {
            '@': resolve(process.cwd(), 'src'),
        },
    },
};
