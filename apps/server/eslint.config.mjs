import antfu from '@antfu/eslint-config'

export default antfu({
    formatters: true,
    typescript: true,
    stylistic: {
        indent: 4,
        quotes: 'single',

    },
    rules: {
        'ts/no-empty-object-type': 'off',
        'node/prefer-global/process': 'off',
        'no-console': 'off',
        'sort-imports': {
            type: 'alphabetical',
        },
    },

})
