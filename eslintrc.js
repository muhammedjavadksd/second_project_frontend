module.exports = {
    parser: '@typescript-eslint/parser',
    // extends: [
    //     'eslint:recommended',
    //     'plugin:@typescript-eslint/recommended'
    // ],
    // plugins: ['@typescript-eslint'],
    // rules: {
    //     '@typescript-eslint/explicit-function-return-type': 'error',
    //     '@typescript-eslint/explicit-module-boundary-types': 'error',
    //     '@typescript-eslint/no-explicit-any': 'error'
    // },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    "rules": {
        "react/no-unescaped-entities": "off",
        "@next/next/no-page-custom-font": "off"
    }
    // rules: {
    //     "eqeqeq": ["error", "always"],
    //     "no-eval": "error"
    // }
};
