module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'react-app',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'eslint-plugin-import',
    ],
    rules: {
        quotes: ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        semi: ['error', 'always'],
        'no-trailing-spaces': ['error'],
        'no-multi-spaces': ['error'],
        'react/jsx-tag-spacing': [
            'error', {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'always',
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 2 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'max-len': ['warn', { code: 120, tabWidth: 4, ignoreUrls: true }],
        'function-paren-newline': ['error', 'multiline-arguments'],
        'function-call-argument-newline': ['error', 'consistent'],
        'object-curly-newline': ['error', { multiline: true }],
        'array-element-newline': ['error', 'consistent'],
        'array-bracket-newline': ['error', { multiline: true }],
        'multiline-ternary': ['error', 'always-multiline'],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        'eol-last': ['error'],
        'newline-before-return': 'error',
        'comma-style': ['error', 'last'],
        'operator-linebreak': ['error', 'after'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-shadow': ['error'],
        'no-param-reassign': ['warn'],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-props-no-spreading': ['warn'],
        'react/react-in-jsx-scope': ['off'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react-hooks/rules-of-hooks': ['error'],
        'react-hooks/exhaustive-deps': ['warn'],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        'import/order': [
            'error', {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/newline-after-import': ['error'],
        'import/no-duplicates': 'error',
    },
};
