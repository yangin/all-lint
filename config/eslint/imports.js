module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.json'] }
    },
    'import/extensions': ['.js'],
    'import/core-modules': [],
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$']
  },

  /**
   * import/no-unresolved: off 因为ts自带检查功能
   * import/extensions: off 不使用是因为在tsconfig.json中设置paths后会出现解析错误，可以通过设置eslint-import-resolver-typescript来解决
   */
  rules: {
    // 报告任何无效的import,如相同名字
    'import/export': ['error'],

    // 确保所有的import在声明之前
    'import/first': ['error'],

    // 在最后一个顶级导入语句或要求调用之后有一个空行
    'import/newline-after-import': ['error', { 'count': 1 }],

    // 禁止使用绝对路径
    'import/no-absolute-path': ['error'],

    // 报告在多个地方重复导入同一模块 --fix
    'import/no-duplicates': ['error'],

    // 禁止通过 var 或 let 使用可变导出
    'import/no-mutable-exports': ['error'],

    // 禁止使用默认导出作为本地命名导入，如 export default 'foo'; export const bar = 'baz';
    'import/no-named-default': ['error'],

    // 禁止自身引用
    'import/no-self-import': ['error'],

    // 禁止无用的路径片段，及index.js路径片段
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

    // 禁止导入中的 webpack 加载器语法
    'import/no-webpack-loader-syntax': ['error'],

    // 定义import的排序 --fix
    'import/order': ['error', { 'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'] }]
  }
}
