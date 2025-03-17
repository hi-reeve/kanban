import antfu from '@antfu/eslint-config'

export default antfu({
    formatters: true,
    typescript: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
    },

    rules: {

        'sort-imports': {
            type: 'alphabetical',
        },
    },
})
