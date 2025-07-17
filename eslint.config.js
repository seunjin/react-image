// eslint.config.mjs
import naverpay from '@naverpay/eslint-config'

export default [
    naverpay,
    {
        ignores: ['dist', 'node_modules'],
    },
]
