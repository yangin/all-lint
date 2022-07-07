/**
 * For javaScript
 * dependency
 * es: eslint、eslint-plugin-import、eslint-plugin-jest、eslint-plugin-node、eslint-plugin-promise
 * babel: @babel/eslint-parser、 @babel/core
 */
module.exports = {
  extends: [
    './best-practices',
    './errors',
    './node',
    './style',
    './variables',
    './es6',
    './imports'
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    requireConfigFile: false
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {}
}
