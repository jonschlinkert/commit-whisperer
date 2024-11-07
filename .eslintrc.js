module.exports = {
  root: true,
  extends: 'eslint:recommended',

  env: {
    commonjs: true,
    es2023: true,
    mocha: true,
    node: true
  },

  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false
  },

  rules: {
    'accessor-pairs': 2,
    'array-bracket-newline': [1, 'consistent'],
    'array-bracket-spacing': [1, 'never'],
    'array-callback-return': 1,
    'array-element-newline': [1, 'consistent'],
    'arrow-body-style': 0,
    'arrow-parens': [1, 'as-needed'],
    'arrow-spacing': [1, { before: true, after: true }],
    'block-scoped-var': 1,
    'block-spacing': [1, 'always'],
    'brace-style': [1, '1tbs', { allowSingleLine: true }],
    'callback-return': 0,
    'camelcase': [0, { allow: [] }],
    'capitalized-comments': 0,
    'class-methods-use-this': 0,
    'comma-dangle': [1, 'never'],
    'comma-spacing': [1, { before: false, after: true }],
    'comma-style': [1, 'last'],
    'complexity': 1,
    'computed-property-spacing': 1,
    'consistent-return': 0,
    'consistent-this': 1,
    'constructor-super': 2,
    'curly': [1, 'multi-line', 'consistent'],
    'default-case': 1,
    'dot-location': [1, 'property'],
    'dot-notation': 1,
    'eol-last': 1,
    'eqeqeq': [1, 'allow-null'],
    'for-direction': 1,
    'func-call-spacing': 2,
    'generator-star-spacing': [1, { before: true, after: true }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [1, 2, { SwitchCase: 1 }],
    'key-spacing': [1, { beforeColon: false, afterColon: true }],
    'keyword-spacing': [1, { before: true, after: true }],
    'linebreak-style': [1, 'unix'],
    'new-cap': [1, { newIsCap: true, capIsNew: false }],
    'new-parens': 2,
    'no-alert': 1,
    'no-array-constructor': 1,
    'no-async-promise-executor': 1,
    'no-caller': 2,
    'no-case-declarations': 1,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-console': 0,
    'no-const-assign': 2,
    'no-constant-condition': [1, { checkLoops: false }],
    'no-control-regex': 2,
    'no-debugger': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-duplicate-imports': 0,
    'no-else-return': 0,
    'no-empty-character-class': 2,
    'no-empty-function': 0,
    'no-empty-pattern': 0,
    'no-empty': [1, { allowEmptyCatch: true }],
    'no-eval': 0,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 1,
    'no-extra-boolean-cast': 1,
    'no-extra-label': 1,
    'no-extra-parens': [1, 'all', { conditionalAssign: false, returnAssign: false, nestedBinaryExpressions: false, ignoreJSX: 'multi-line', enforceForArrowConditionals: false }],
    'no-extra-semi': 1,
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-global-assign': 2,
    'no-implicit-coercion': 2,
    'no-implicit-globals': 1,
    'no-implied-eval': 2,
    'no-inner-declarations': [1, 'functions'],
    'no-invalid-regexp': 2,
    'no-invalid-this': 1,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-loop-func': 1,
    'no-mixed-requires': 1,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-assign': 0,
    'no-multi-spaces': 1,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-native-reassign': 2,
    'no-negated-condition': 0,
    'no-negated-in-lhs': 2,
    'no-new-func': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 1,
    'no-new-wrappers': 2,
    'no-new': 1,
    'no-obj-calls': 2,
    'no-octal-escape': 2,
    'no-octal': 2,
    'no-path-concat': 1,
    'no-proto': 2,
    'no-prototype-builtins': 0,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-restricted-globals': 2,
    'no-return-assign': 1,
    'no-return-await': 2,
    'no-script-url': 1,
    'no-self-assign': 1,
    'no-self-compare': 1,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 0,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 0,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 1,
    'no-undef-init': 2,
    'no-undef': 2,
    'no-unexpected-multiline': 2,
    'no-unneeded-ternary': [1, { defaultAssignment: false }],
    'no-unreachable-loop': 1,
    'no-unreachable': 2,
    'no-unsafe-assignment': 0,
    'no-unsafe-call': 0,
    'no-unsafe-finally': 2,
    'no-unsafe-member-access': 0,
    'no-unsafe-negation': 2,
    'no-unsafe-optional-chaining': 0,
    'no-unsafe-return': 0,
    'no-unused-expressions': 2,
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
    'no-use-before-define': 0,
    'no-useless-call': 2,
    'no-useless-catch': 0,
    'no-useless-escape': 0,
    'no-useless-rename': 1,
    'no-useless-return': 1,
    'no-var': 1,
    'no-void': 1,
    'no-warning-comments': 0,
    'no-with': 2,
    'object-curly-spacing': [1, 'always', { objectsInObjects: true }],
    'object-shorthand': 1,
    'one-var': [1, { initialized: 'never' }],
    'operator-linebreak': [0, 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'padded-blocks': [1, { switches: 'never' }],
    'prefer-const': [1, { destructuring: 'all', ignoreReadBeforeAssign: false }],
    'prefer-promise-reject-errors': 1,
    'quotes': [1, 'single', 'avoid-escape'],
    'radix': 2,
    'rest-spread-spacing': 1,
    'semi-spacing': [1, { before: false, after: true }],
    'semi-style': 1,
    'semi': [1, 'always'],
    'space-before-blocks': [1, 'always'],
    'space-before-function-paren': [1, { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    'space-in-parens': [1, 'never'],
    'space-infix-ops': 1,
    'space-unary-ops': [1, { words: true, nonwords: false }],
    'spaced-comment': [0, 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],
    'strict': 2,
    'switch-colon-spacing': 1,
    'symbol-description': 1,
    'template-curly-spacing': [2, 'never'],
    'template-tag-spacing': [2, 'never'],
    'unicode-bom': 1,
    'use-isnan': 2,
    'valid-jsdoc': 1,
    'valid-typeof': 2,
    'wrap-iife': [1, 'any'],
    'yoda': [1, 'never'],

    // TypeScript
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/no-unused-vars': [1, { vars: 'all', args: 'after-used', argsIgnorePattern: '^_' }]
  },

  ignorePatterns: [
    'node_modules',
    'dist',
    'tmp',
    'temp',
    'lib/templates',
    'support',
    'test/fixtures',
    'test/support'
  ]
};
