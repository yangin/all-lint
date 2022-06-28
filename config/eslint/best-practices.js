module.exports = {
  rules: {
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': ['error'],

    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': ['error'],

    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': ['error'],

    // 强制所有控制语句使用一致的括号风格 --fix
    'curly': ['error', 'multi-line'],

    // 强制在点号之前和之后一致的换行 --fix
    'dot-location': ['error', 'property'],

    // 要求使用 === 和 !== --fix
    'eqeqeq': ['error', 'always', { null: 'ignore' }],

    // 禁用 alert、confirm 和 prompt
    'no-alert': ['error'],

    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': ['error'],

    // 不允许在 case 子句中使用词法声明
    'no-case-declarations': ['error'],

    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': ['error'],

    // 禁止出现空函数
    'no-empty-function': ['error'],

    // 禁止使用空解构模式
    'no-empty-pattern': ['error'],

    // 禁用 eval()
    'no-eval': ['error'],

    // 禁止扩展原生类型
    'no-extend-native': ['error'],

    // 禁止不必要的 .bind() 调用 --fix
    'no-extra-bind': ['error'],

    // 禁止 case 语句落空
    'no-fallthrough': ['error'],

    // 禁止数字字面量中使用前导和末尾小数点 --fix
    'no-floating-decimal': ['error'],

    // 禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': ['error'],

    // 禁止使用类似 eval() 的方法
    'no-implied-eval': ['error'],

    // 禁用 __iterator__ 属性
    'no-iterator': ['error'],

    // 禁用标签语句, 该规则忽略循环语句、 switch 语句中的标签
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

    // 禁用不必要的嵌套块
    'no-lone-blocks': ['error'],

    // 禁止在循环语句中出现包含不安全引用的函数声明
    'no-loop-func': ['error'],

    // 禁止使用多个空格 --fix
    'no-multi-spaces': ['error'],

    // 禁止使用多行字符串??
    'no-multi-str': ['error'],

    // 禁止使用 new 以避免产生副作用
    'no-new': ['error'],

    // 禁止对 Function 对象使用 new 操作符
    'no-new-func': ['error'],

    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': ['error'],

    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': ['error'],

    // 禁用八进制字面量
    'no-octal': ['error'],

    // 禁用 __proto__ 属性
    'no-proto': ['error'],

    // 禁止多次声明同一变量
    'no-redeclare': ['error'],

    // 禁止在 return 语句中使用赋值语句, 除非使用括号把它们括起来
    'no-return-assign': ['error', 'except-parens'],

    // 禁用不必要的 return await
    'no-return-await': ['error'],

    // 禁止自我赋值
    'no-self-assign': ['error'],

    // 禁止自身比较
    'no-self-compare': ['error'],

    // 禁用逗号操作符
    'no-sequences': ['error'],

    // 禁止抛出异常字面量
    'no-throw-literal': ['error'],

    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': ['error'],

    // 禁止出现未使用过的表达式, 将允许你在表达式中使用 逻辑短路、三元运算符、带标签的模板字面量 求值
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],

    // 禁用出现未使用过的标 --fix
    'no-unused-labels': ['error'],

    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': ['error'],

    // 禁止不必要的 catch 子句
    'no-useless-catch': ['error'],

    // 禁用不必要的转义字符
    'no-useless-escape': ['error'],

    // 禁止多余的 return 语句 --fix
    'no-useless-return': ['error'],

    // 禁用 with 语句
    'no-with': ['error'],

    // 要求使用 Error 对象作为 Promise 拒绝的原因
    'prefer-promise-reject-errors': ['error'],

    // 要求 IIFE 使用括号括起来, 使用 .call 和 .apply 调用时，强制要求包裹函数表达式 --fix
    'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],

    // 要求或禁止 “Yoda” 条件 --fix
    'yoda': ['error', 'never']
  }
}
