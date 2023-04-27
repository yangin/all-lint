/**
 * 基于webpack与babel的项目语言预制
 **/
const LANGUAGE_PRESETS = {
  webpack: ['webpack', 'webpack-cli'],
  babel: ['babel-loader', '@babel/core', '@babel/preset-env'],
  typescript: ['typescript', '@babel/preset-typescript'],
  css: ['css-loader', 'postcss', 'postcss-loader'],
  less: ['less', 'less-loader'],
  react: ['react', 'react-dom', '@babel/preset-react']
}

/**
 * commitlint预设
 **/
const COMMITLINT_PRESETS = {
  configRegexp: /^\.commitlintrc((\.(json|yaml|yml|js|cjs|ts|cts))|(\.config\.(js|cjs|ts|cts)))?$/,
  // 包含 commitlint 的正则表达式
  dependenciesRegexp: /commitlint/
}

/**
 * eslint配置文件名正则表达式
 **/
const ESLINT_PRESETS = {
  configRegexp: /^\.eslintrc((\.(json|yaml|yml|js|cjs|ts|cts))|(\.config\.(js|cjs|ts|cts)))?$/,
  dependenciesRegexp: /eslint/
}

/**
 * stylelint配置文件名正则表达式
 **/
const STYLELINT_PRESETS = {
  configRegexp: /^\.stylelintrc((\.(json|yaml|yml|js|cjs|ts|cts))|(\.config\.(js|cjs|ts|cts)))?$/,
  dependenciesRegexp: /stylelint/
}

/**
 * prettier配置文件名正则表达式
 **/
const PRETTIER_PRESETS = {
  configRegexp: /^\.prettierrc((\.(json|yaml|yml|js|cjs|ts|cts))|(\.config\.(js|cjs|ts|cts)))?$/,
  dependenciesRegexp: /prettier/
}

/**
 * lint相关的所有依赖
 */
const ALL_LINT_DEPENDENCIES_REGEXP = new RegExp(
  [
    ESLINT_PRESETS.dependenciesRegexp.source,
    STYLELINT_PRESETS.dependenciesRegexp.source,
    COMMITLINT_PRESETS.dependenciesRegexp.source,
    PRETTIER_PRESETS.dependenciesRegexp.source
  ].join('|')
)

/**
 * 依赖
 */
const LINT_DEPENDENCIES = {
  prettier: ['prettier'],
  javascript: [
    '@babel/eslint-parser',
    'eslint',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'prettier'
  ],
  typescript: [
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin'
  ],
  react: [
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jest'
  ],
  css: [
    'stylelint',
    'stylelint-order'
  ],
  less: ['postcss-less'],
  commitlint: ['@commitlint/cli']
}

/**
 * VSCode插件Map
 */
const VSCODE_EXTENSIONS = {
  eslint: 'ESLint',
  stylelint: 'Stylelint',
  prettier: 'Prettier - Code formatter'
}

module.exports = {
  LANGUAGE_PRESETS,
  COMMITLINT_PRESETS,
  ESLINT_PRESETS,
  STYLELINT_PRESETS,
  PRETTIER_PRESETS,
  ALL_LINT_DEPENDENCIES_REGEXP,
  LINT_DEPENDENCIES,
  VSCODE_EXTENSIONS
}
