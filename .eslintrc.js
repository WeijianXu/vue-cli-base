module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    project: './jsconfig.json',
  },
  plugins: ['import'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['warn', 2],
    'import/extensions': 'off',
    'linebreak-style': ['warn', 'unix'],
    'comma-dangle': ['warn', 'only-multiline', { function: 'never' }],
    'arrow-parens': 'off',
    semi: 'warn',
    quotes: ['warn', 'single'],
    'quote-props': 'off',
    camelcase: 'off',
    'max-len': ['warn', { code: 100, ignoreStrings: true, ignoreUrls: true }],
    'operator-linebreak': [
      'warn',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    'object-curly-newline': ['warn', { consistent: true }],
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'array-element-newline': 'off',
    'no-trailing-spaces': 'warn',
    // iview 中关闭自闭合标签校验
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-underscore-dangle': 'off', // _varname 命名方式
    'vetur.validation.template': 'off', // vue 中使用和HTML保留组件名，如 Input/Table

    // 统一 prettier 行为
    'prettier/prettier': ['off', { singleQuote: true }],
  },
};
