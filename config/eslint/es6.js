module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      generators: false,
      objectLiteralDuplicateProperties: false
    }
  },

  rules: {
    // 当大括号是可以省略的，强制不使用它们
    'arrow-body-style': ['error', 'as-needed'],

    // 要求在所有情况下使用圆括号将参数括起来
    'arrow-parens': ['error', 'as-needed'],

    // 强制箭头函数的箭头前后使用一致的空格 --fix
    'arrow-spacing': ['error', { before: true, after: true }],

    // 要求在构造函数中有 super() 的调用
    'constructor-super': ['error'],

    // 强制 generator 函数中 * 号周围使用一致的空格 --fix
    'generator-star-spacing': ['error', { before: true, after: true }],

    // 禁止修改类声明的变量
    'no-class-assign': ['error'],

    // 禁止修改 const 声明的变量
    'no-const-assign': ['error'],

    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': ['error'],

    // 禁止重复模块导入
    'no-duplicate-imports': ['error'],

    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': ['error'],

    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': ['error'],

    // 禁止在对象中使用不必要的计算属性 --fix
    'no-useless-computed-key': ['error'],

    // 禁用不必要的构造函数
    'no-useless-constructor': ['error'],

    // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字 --fix
    'no-useless-rename': ['error'],

    // 要求使用 let 或 const 而不是 var --fix
    'no-var': ['error'],

    // 要求对象字面量中属性使用简写语法。方法不做要求 --fix
    'object-shorthand': ['error', 'properties'],

    // 要求使用 const 声明那些声明后不再被修改的变量 --fix
    'prefer-const': ['error'],

    // 要求使用模板字面量而非字符串连接 --fix
    'prefer-template': ['error'],

    // 要求 generator 函数内有 yield
    'require-yield': ['error'],

    // 强制扩展运算符及其表达式之间不允许有空格 --fix
    'rest-spread-spacing': ['error', 'never'],

    // 要求 symbol 描述
    'symbol-description': ['error'],

    // 禁止模板字面量中花括号内出现空格 --fix
    'template-curly-spacing': ['error', 'never'],

    // 强制在 yield* 表达式中 * 左右使用空格 --fix
    'yield-star-spacing': ['error', 'both']
  }
}
