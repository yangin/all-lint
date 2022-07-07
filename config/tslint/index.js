/**
 * For typescript
 * dependency
 * es: eslint、eslint-plugin-import、eslint-plugin-jest、eslint-plugin-node、eslint-plugin-promise
 * typescript: @typescript-eslint/parser、@typescript-eslint/eslint-plugin
 */
module.exports = {
  extends: [...[
    '../eslint/best-practices',
    '../eslint/errors',
    '../eslint/node',
    '../eslint/style',
    '../eslint/variables',
    '../eslint/es6',
    '../eslint/imports',
    './typescript'
  ].map(require.resolve), 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.json', '.d.ts']
      }
    },
    'import/extensions': ['.ts', '.js', '.d.ts']
  }
}
