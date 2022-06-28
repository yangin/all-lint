module.exports = {
  rules: {
    // 要求css关键字采用小写
    'value-keyword-case': 'lower',
    // 要求方法名小写
    'function-name-case': 'lower',
    // 要求自定义属性必须有空行
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    // 要求类型选择器必须为小写
    'selector-type-case': 'lower',
    // 要去多行规则前必须有一个空行
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    // 在at-rule规则之前必须有空行
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    // 注释前必须有空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands']
      }
    ],
    // 要求注释内必须有空格
    'comment-whitespace-inside': 'always',

    // 要求hex格式的颜色值采用小写，如 #fff
    'color-hex-case': 'lower',
    // 要去在函数多行时，逗号后必须换行
    'function-comma-newline-after': 'always-multi-line',
    // 要求函数在单行的情况下逗号后必有有空格
    'function-comma-space-after': 'always-single-line',
    // 要求函数内相邻行之间不允许有空行
    'function-max-empty-lines': 0,
    // 要求多行函数的括号内必须始终有换行符
    'function-parentheses-newline-inside': 'always-multi-line',
    // 要求单行函数的括号内附近不能有空格，即括号内紧邻位置不能有空格
    'function-parentheses-space-inside': 'always-single-line',
    // 要求函数后必须有空格
    'function-whitespace-after': 'always',

    // 对于小于 1 的小数，要求有前导零
    'number-leading-zero': 'always',
    // 禁止小数后面有多余的 0，如 a { top: 0.5000px; bottom: 1.0px; } 不被允许
    'number-no-trailing-zeros': true,

    // 要求字符串必须使用双引号包围
    'string-quotes': 'double',

    // 要求单位必须小写
    'unit-case': 'lower',

    // 多行值列表的逗号后必须有换行符
    'value-list-comma-newline-after': 'always-multi-line',
    // 单行值列表的逗号后必须有空格
    'value-list-comma-space-after': 'always-single-line',
    // 禁止值列表值之间有空行
    'value-list-max-empty-lines': 0,

    // 要求属性名必须小写
    'property-case': 'lower',

    // 声明的感叹号后禁止有空格， 如 a { color: pink! important; } 是不被允许的
    'declaration-bang-space-after': 'never',
    // 声明的感叹号前必须有空格， 如 a { color: pink !important; }
    'declaration-bang-space-before': 'always',

    // 要求声明的值是多行的，则冒号后必须始终有一个换行符
    'declaration-colon-newline-after': 'always-multi-line',
    // 要求单行声明的冒号后必须有空格
    'declaration-colon-space-after': 'always-single-line',
    // 禁止声明的冒号前有空格
    'declaration-colon-space-before': 'never',
    // 声明前必须有一个空行
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],

    // 要求多行声明块的分号后必须有换行符
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    // 要求单行声明块的分号后必须有空格
    'declaration-block-semicolon-space-after': 'always-single-line',
    // 禁止声明块的分号前有空格
    'declaration-block-semicolon-space-before': 'never',
    // 要求声明块中必须始终有一个尾随分号， 如 a { background: orange; color: pink } 是不被允许的
    'declaration-block-trailing-semicolon': 'always',

    // 禁止在块的右大括号前有空行
    'block-closing-brace-empty-line-before': 'never',
    // 块的右大括号后必须始终有换行符
    'block-closing-brace-newline-after': 'always',
    // 在多行块中的右大括号之前必须始终有一个换行符
    'block-closing-brace-newline-before': 'always-multi-line',
    // 要求在单行块中右大括号前有空格，如 a { color: pink; }
    'block-closing-brace-space-before': 'always-single-line',
    // 在多行块中的左大括号之后必须始终有一个换行符
    'block-opening-brace-newline-after': 'always-multi-line',
    // 要求在单行块中左大括号后有空格，如 a { color: pink; }
    'block-opening-brace-space-after': 'always-single-line',
    // 左大括号前必须始终有一个空格
    'block-opening-brace-space-before': 'always',

    // 禁止属性选择器的括号内有空格， 如 [target=_blank ] {} 是不被允许的
    'selector-attribute-brackets-space-inside': 'never',
    // 属性选择器运算符后面禁止有空格, 如 [target= _blank] {} 是不被允许的
    'selector-attribute-operator-space-after': 'never',
    // 属性选择器运算符前面禁止有空格
    'selector-attribute-operator-space-before': 'never',
    // 选择器组合符后面必须有一个空格， 如 a + b { color: pink; }
    'selector-combinator-space-after': 'always',
    // 选择器组合符前面必须有一个空格，
    'selector-combinator-space-before': 'always',
    // 禁止选择器的后代组合符使用非空格字符, 如 .foo .bar {}
    'selector-descendant-combinator-no-non-space': true,
    // 相邻选择器中禁止有空行
    'selector-max-empty-lines': 0,
    // 类的伪类选择器必须采用小写，如 .foo:hover {}
    'selector-pseudo-class-case': 'lower',
    // 在伪类选择器中的括号内禁止有空格, 如 input:not([type="submit"]) {}
    'selector-pseudo-class-parentheses-space-inside': 'never',
    // 标签的伪类必须为小写, 如 a:hover {}
    'selector-pseudo-element-case': 'lower',

    // 多列选择器列表的逗号后需要换行符
    'selector-list-comma-newline-after': 'always-multi-line',
    // 单行选择器列表中的逗号后必须始终有一个空格
    'selector-list-comma-space-after': 'always-single-line',
    // 选择器列表的逗号前禁止有空格
    'selector-list-comma-space-before': 'never',

    // media选择器的冒号后面必须有一个空格
    'media-feature-colon-space-after': 'always',
    // media选择器的冒号前禁止有空格
    'media-feature-colon-space-before': 'never',
    // 媒体查询的元素名必须小写， 如 @media (min-width: 700px) {}
    'media-feature-name-case': 'lower',
    // 媒体查询的括号内不能有空格， 如 @media (max-width: 300px) {}
    'media-feature-parentheses-space-inside': 'never',
    // 在媒体查询的运算符之后需要一个空格， @media (width >= 600px) {}
    'media-feature-range-operator-space-after': 'always',
    // 在媒体查询的运算符之前需要一个空格
    'media-feature-range-operator-space-before': 'always',

    // 多行媒体查询列表中的逗号后必须始终有换行符
    'media-query-list-comma-newline-after': 'always-multi-line',
    // 单行媒体查询列表中的逗号后必须有一个空格
    'media-query-list-comma-space-after': 'always-single-line',
    // 媒体查询列表中的逗号前禁止有空格
    'media-query-list-comma-space-before': 'never',

    // 要求 at-rules 名称为小写，如 @Media (min-width: 50em) {} 是不被允许的
    'at-rule-name-case': 'lower',
    // 要求单行的 at-rules 名称后面必须有一个空格，如 @media (min-width: 50em) {}
    'at-rule-name-space-after': 'always-single-line',
    // 要求at-rule的的分号后必须有换行，如 @import url("x.css");
    'at-rule-semicolon-newline-after': 'always',
    // 禁止at-rule的的分号前有空格，如 @import url("x.css") ;是不被允许的
    'at-rule-semicolon-space-before': 'never',

    // 要求以2个空格作为缩进
    'indentation': 2,
    // 要求最大空行数为1行
    'max-empty-lines': 1,
    // 禁止行尾空格
    'no-eol-whitespace': true,
    // 禁止缺少源代码结尾的换行符
    'no-missing-end-of-source-newline': true,
    // 禁止第一行为空行
    'no-empty-first-line': true,
    // 禁止额外的分号
    'no-extra-semicolons': true
  }
}
