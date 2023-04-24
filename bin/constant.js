// 基于webpack与babel的项目语言预制
const LANGUAGE_PRESETS = {
  webpack: ['webpack', 'webpack-cli'],
  babel: ['babel-loader', '@babel/core', '@babel/preset-env'],
  typescript: ['typescript', '@babel/preset-typescript'],
  css: ['css-loader', 'postcss', 'postcss-loader'],
  less: ['less', 'less-loader'],
  react: ['react', 'react-dom', '@babel/preset-react']
}

module.exports = {
  LANGUAGE_PRESETS
}