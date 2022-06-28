module.exports = {
  rules: {
    // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
    'for-direction': ['error'],

    // 强制 getter 函数中出现 return 语句
    'getter-return': ['error'],

    // 禁止使用异步函数作为 Promise executor
    'no-async-promise-executor': ['error'],

    // 禁止与 -0 进行比较
    'no-compare-neg-zero': ['error'],

    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': ['error'],

    // 允许 console
    'no-console': ['off'],

    // 禁止在条件中使用常量表达式
    'no-constant-condition': ['error', { checkLoops: false }],

    // 禁止在正则表达式中使用控制字符
    'no-control-regex': ['error'],

    // 禁用 debugger
    'no-debugger': ['error'],

    // 禁止 function 定义中出现重名参数
    'no-dupe-args': ['error'],

    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': ['error'],

    // 禁止出现重复的 case 标签
    'no-duplicate-case': ['error'],

    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': ['error'],

    // 禁止出现空语句块
    'no-empty': ['error'],

    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': ['error'],

    // 禁止不必要的布尔转换 --fix
    'no-extra-boolean-cast': ['error'],

    // 禁止不必要的括号 --fix
    'no-extra-parens': ['error', 'functions'],

    // 禁止不必要的分号 --fix
    'no-extra-semi': ['error'],

    // 禁止对 function 声明重新赋值
    'no-func-assign': ['error'],

    // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-inner-declarations': ['error', 'functions'],

    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': ['error'],

    // 禁止不规则的空白
    'no-irregular-whitespace': ['error'],

    // 不允许在字符类语法中出现由多个代码点组成的字符
    'no-misleading-character-class': ['error'],

    // 禁止把全局对象作为函数调用
    'no-obj-calls': ['error'],

    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': ['error'],

    // 禁止正则表达式字面量中出现多个空格 --fix
    'no-regex-spaces': ['error'],

    // 禁用稀疏数组
    'no-sparse-arrays': ['error'],

    // 禁止在常规字符串中出现模板字面量占位符语法
    'no-template-curly-in-string': ['error'],

    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': ['error'],

    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': ['error'],

    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': ['error'],

    // 禁止对关系运算符的左操作数使用否定操作符 --fix
    'no-unsafe-negation': ['error'],

    // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    'require-atomic-updates': ['error'],

    // 要求使用 isNaN() 检查 NaN
    'use-isnan': ['error'],

    // 要求 typeof 表达式只与字符串字面量或其它 typeof 表达式 进行比较，禁止与其它值进行比较
    'valid-typeof': ['error', { requireStringLiterals: true }]
  }
}
