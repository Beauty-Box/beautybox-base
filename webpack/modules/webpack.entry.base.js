const { resolve } = require('path');

module.exports = (module) => ({
    entry: {
        [module]: resolve(__dirname, '..', '..', '..', module, 'src', 'main'),
    },
    resolve: {
        alias: {
            ['@' + module]: resolve(__dirname, '..', '..', '..', module, 'src'),
        },
    },
});
