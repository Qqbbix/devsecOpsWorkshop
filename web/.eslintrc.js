module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 'off',
    'arrow-body-style': 'off',
    'vue/max-attributes-per-line': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
