import antfu from '@antfu/eslint-config'

export default antfu({
    formatters: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
        jsx: true,
        overrides: {
            'style/no-tabs': 'off',
        },
    },
    extends: [
        'next/core-web-vitals',
        'next/typescript',
    ],
    rules: {
        'node/prefer-global/process': 'off',
        'sort-imports': {
            type: 'alphabetical',
        },
    },
})
