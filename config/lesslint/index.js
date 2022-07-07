/**
 * less
 * dependency: stylelint、stylelint-order、postcss、postcss-less
 */
module.exports = {
  'extends': [
    '../stylelint/errors.js',
    '../stylelint/conventions.js',
    '../stylelint/style.js',
    '../stylelint/order.js'
  ].map(require.resolve),
  'customSyntax': 'postcss-less',
  'rules': {}
}
