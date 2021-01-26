module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    env: {
        test: {
            plugins: ['require-context-hook', '@babel/proposal-export-default-from'],
        },
    },
};
