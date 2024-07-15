module.exports = {
	settings: {
		react: {
			version: 'detect'
		}
	},
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@next/next/recommended',
		'prettier'
	],
	overrides: [
		{
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'react', 'prettier'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: true,
				fixStyle: 'inline-type-imports'
			}
		],
		'react/no-unescaped-entities': 'error',
		'no-console': 'error',
		'padding-line-between-statements': [
			'warn',
			{ blankLine: 'always', prev: '*', next: 'block' },
			{ blankLine: 'always', prev: 'block', next: '*' },
			{ blankLine: 'always', prev: '*', next: 'block-like' },
			{ blankLine: 'always', prev: 'block-like', next: '*' }
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				shorthandFirst: true,
				shorthandLast: false,
				multiline: 'last',
				ignoreCase: true,
				noSortAlphabetically: false,
				reservedFirst: true,
				locale: 'auto'
			}
		],
		'no-empty': 'error',
		'no-restricted-syntax': [
			'error',
			{
				selector:
					'ArrowFunctionExpression:not(CallExpression > ArrowFunctionExpression):not(Property > ArrowFunctionExpression):not(JSXExpressionContainer > ArrowFunctionExpression)',
				message:
					'Arrow functions are not allowed except in callbacks, object properties, and JSX properties.'
			}
		],
		'react/jsx-curly-brace-presence': [
			'error',
			{
				props: 'never',
				children: 'never'
			}
		],
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'linebreak-style': 'off',
		'prettier/prettier': 'off',
		'react/no-unstable-nested-components': 'off'
	}
}
