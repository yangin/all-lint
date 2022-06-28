module.exports = {
  rules: {
    // 要求组件必须有显示的命名
    'react/display-name': 'error',

    // 要求组件的事件属性名命名规范
    // 'react/jsx-handler-names': ['warn', {
    //   eventHandlerPrefix: 'on',
    //   eventHandlerPropPrefix: 'on'
    // }],

    // 要求数据必须具有key属性
    'react/jsx-key': 'warn',

    // 标签的子部分内的注释应放在大括号内
    'react/jsx-no-comment-textnodes': ['error'],

    // 禁止有重复的属性
    'react/jsx-no-duplicate-props': 'error',

    // 禁止使用javascript:链接，如<a href="javascript:void(0)"> 是不被允许的
    'react/jsx-no-script-url': 'error',

    // 要求 target='_blank' 必须携带 rel='noreferrer'
    'react/jsx-no-target-blank': 'error',

    // 禁止在 JSX 中使用未声明的变量
    'react/jsx-no-undef': ['error'],

    // 禁止非必要的fragments
    'react/jsx-no-useless-fragment': 'error',

    // 禁止内联jsx属性之间有多个空格
    'react/jsx-props-no-multi-spaces': 'error',

    // 要求组件的属性排序
    'react/jsx-sort-props': ['error', {
      'callbacksLast': true,
      'shorthandFirst': true,
      'noSortAlphabetically': true,
      'reservedFirst': ['key', 'ref']
    }],

    // 防止 React 被标记为未使用
    'react/jsx-uses-react': ['error'],

    // 防止 JSX 中使用的变量被标记为未使用
    'react/jsx-uses-vars': ['error'],

    // 要求多行jsx要用括号包裹
    'react/jsx-wrap-multilines': 'error',

    // 禁止children 作为声明属性
    'react/no-children-prop': ['error'],

    // 禁止使用已启用的方法，如componentWillMount、componentWillUpdate 等
    'react/no-deprecated': ['error'],

    // 禁止直接对state进行操作，需通过setState来操作
    'react/no-direct-mutation-state': ['error'],

    // 禁止使用 findDOMNode，推荐用 refs 替代
    'react/no-find-dom-node': ['error'],

    // 禁止使用 isMounted
    'react/no-is-mounted': ['error'],

    // 禁止 ReactDom.render 有返回值
    'react/no-render-return-value': ['error'],

    // 禁止直接采用 ref=字符串 的方式来定义ref, 推荐采用给this添加一个ref的实例来表示
    'react/no-string-refs': ['error'],

    // 禁止未转移的特殊字符，如 < “ ‘ } > 等
    'react/no-unescaped-entities': ['error'],

    // 禁止在Dom标签中存在未知的属性 --fix
    'react/no-unknown-property': ['error'],

    // 禁止不安全的生命周期的使用，如componentWillMount，componentWillReceiveProps，componentWillUpdate
    'react/no-unsafe': ['off'],

    // 禁止被定义的属性未被使用
    'react/no-unused-prop-types': ['error'],

    // 强制react组件必须有属性验证
    'react/prop-types': ['error'],

    // 在使用jsx语法时，必须要声明React作用域
    'react/react-in-jsx-scope': ['error'],

    // 强制render方法必须要有return返回值
    'react/require-render-return': ['error']
  }
}
