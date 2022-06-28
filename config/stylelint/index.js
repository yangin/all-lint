module.exports = {
  'extends': [
    './errors.js',
    './conventions.js',
    './style.js',
    './order.js'
  ].map(require.resolve),
  'rules': {}
}
