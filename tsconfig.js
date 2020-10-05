module.exports = {
    compilerOptions: {
    outDir: './dist/',
    noImplicitAny: true,
    module: 'commonjs',
    target: 'es5',
    experimentalDecorators: true,
    jsx: 'vue',
    allowJs: true,
    alwaysStrict: true,
    lib: [
        'es2015',
        'dom'
    ],
    paths: {
        '@': ['src'],
        '~': ['./'],
    }
}
}
