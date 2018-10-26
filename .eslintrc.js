// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    // env: {
    //     browser: false,
    // },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        'indent': ['error', 4],
        'space-before-function-paren': ['error', 'never'],
        'camelcase': 0,
        'padded-blocks': 0,
        'no-multiple-empty-lines': 0,
        'no-unused-vars': 0,
        'no-useless-constructor': 0,
        'no-undef': 0
    }
}
