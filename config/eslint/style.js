module.exports = {
  rules: {
    // 禁止在数组括号内出现空格 --fix
    'array-bracket-spacing': ['error', 'never'],

    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': ['error'],

    // 强制在代码块中开括号前和闭括号后有一个或多个空格 --fix
    'block-spacing': ['error', 'always'],

    // 强制在代码块中使用一致的大括号风格,强制 one true brace style, 允许块的开括号和闭括号在 同一行 --fix
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // 强制使用骆驼拼写法命名约定, 强制属性名称为驼峰风格, 对解构标识符强制使用驼峰风格
    'camelcase': ['error', { properties: 'never', ignoreDestructuring: false }],

    // 要求或禁止末尾逗号 --fix
    'comma-dangle': ['error', { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' }],

    // 强制在逗号前后使用一致的空格,逗号后使用空格，逗号前不使用 --fix
    'comma-spacing': ['error', { before: false, after: true }],

    // 强制使用一致的逗号风格,要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'comma-style': ['error', 'last'],

    // 强制在计算的属性的方括号中使用一个或多个空格 --fix
    'computed-property-spacing': ['error', 'always'],

    // 当获取当前执行环境的上下文时，强制使用一致的this别名self
    'consistent-this': ['error', 'self'],

    // 禁止文件末尾存在空行 --fix
    'eol-last': ['error'],

    // 禁止在函数名和开括号之间有空格 --fix
    'func-call-spacing': ['error', 'never'],

    // 禁止在箭头函数体之前出现换行
    'implicit-arrow-linebreak': ['error', 'beside'],

    // 强制使用一致的缩进 --fix
    'indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false
    }],

    // 禁止在对象字面量的键和冒号之间存在空格,要求在对象字面量的冒号和值之间存在至少有一个空格 --fix
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],

    // 要求在关键字之前至少有一个空格, 要求在关键字之后至少有一个空格 --fix
    'keyword-spacing': ['error', { before: true, after: true }],

    // 要求或禁止在三元操作数中间换行
    'multiline-ternary': ['error', 'always-multiline'],

    // 要求构造函数首字母大写,要求调用 new 操作符时有首字母大写的函数，允许调用首字母大写的函数时没有 new 操作符，检查对象属性
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],

    // 禁止调用无参构造函数时有圆括号
    'new-parens': ['error'],

    // 要求方法链中允许在同一行成链的深度为2 --fix
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],

    // 禁用 Array 构造函数
    'no-array-constructor': ['error'],

    // 禁止混合使用不同的操作符
    'no-mixed-operators': ['error', {
      groups: [['==', '!=', '===', '!==', '>', '>=', '<', '<='], ['&&', '||'], ['in', 'instanceof']],
      allowSamePrecedence: true
    }],

    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': ['error'],

    // 禁止连续赋值
    'no-multi-assign': ['error'],

    // 禁止出现多行空行 --fix
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

    // 禁用 Object 的构造函数
    'no-new-object': ['error'],

    // 禁用 tab
    'no-tabs': ['error'],

    // 禁用行尾空格 --fix
    'no-trailing-spaces': ['error'],

    // 禁止可以在有更简单的可替代的表达式时使用三元操作符,禁止条件表达式作为默认的赋值模式 --fix
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // 禁止属性前有空白 --fix
    'no-whitespace-before-property': ['error'],

    // 禁止单行语句之前有换行 --fix
    'nonblock-statement-body-position': ['error', 'beside'],

    // 要求花括号内有空格 (除了 {}) --fix
    'object-curly-spacing': ['error', 'always'],

    // 强制函数中的变量要么一起声明要么分开声明, 要求每个作用域的初始化的变量有多个变量声明 --fix
    'one-var': ['error', { initialized: 'never' }],

    // 强制操作符使用一致的换行符,换行符放在 ？: 之前 --fix
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],

    // 禁止块内填充 --fix
    'padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],

    // 要求尽可能地使用单引号, 允许字符串使用反勾号 --fix
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],

    // 要求对象字面量属性名称使用一致的引号，要么全部用引号，要么都不用
    'quote-props': ['error', 'consistent'],

    // 强制分号之前不使用，之后使用空格 --fix
    'semi-spacing': ['error', { before: false, after: true }],

    // 禁止使用分号代替 ASI --fix
    'semi': ['error', 'never'],

    // 块语句必须总是至少有一个前置空格 --fix
    'space-before-blocks': ['error', 'always'],

    // 强制在 function的左括号之前使用一个的空格 --fix
    'space-before-function-paren': ['error', 'always'],

    // 强制圆括号内没有空格 --fix
    'space-in-parens': ['error', 'never'],

    // 要求操作符周围有空格 --fix
    'space-infix-ops': ['error'],

    // 强制 words 一元操作符后有一个空格, nonwords 一元操作符之前或之后无空格 --fix
    // words - 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
    // nonwords - 适用于这些一元操作符: -、+、--、++、!、!!
    'space-unary-ops': ['error', { words: true, nonwords: false }],

    // 强制在注释中 // 或 /* 使用一致的空格 --fix
    'spaced-comment': ['error', 'always', { line: {
      markers: ['*package', '!', '/', ',', '='] },
    block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
    }],

    // 禁止在一个标记的函数和它的模板字面量之间有空格 --fix
    'template-tag-spacing': ['error', 'never'],

    // 文件不能以 Unicode BOM 开头 --fix
    'unicode-bom': ['error', 'never']
  }
}
