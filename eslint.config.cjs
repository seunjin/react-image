// eslint.config.cjs
const naverpay = require('@naverpay/eslint-config/typescript')

module.exports = [
    ...naverpay,
    {
        ignores: ['dist', 'node_modules'],
    },
]
