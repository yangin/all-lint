module.exports = {
  rules: {
    // 禁止无效的16进制颜色
    'color-no-invalid-hex': true,

    // 禁止重复的字体名称
    'font-family-no-duplicate-names': true,
    // 禁止在字体系列名称列表中缺少通用系列
    'font-family-no-missing-generic-family-keyword': true,

    // 禁止无效的命名网格区域
    'named-grid-areas-no-invalid': true,

    // 禁止在 calc 函数中使用无空格运算符
    'function-calc-no-unspaced-operator': true,
    // 禁止在linear-gradient()标准语法无效时调用方向值
    'function-linear-gradient-no-nonstandard-direction': true,
    // 禁止使用未知函数，当前无法识别less等语言的函数，故暂时禁止使用
    // 'function-no-unknown': true,

    // 禁止在字符串中使用（未转义的）换行符
    'string-no-newline': true,

    // 禁止未知单位
    'unit-no-unknown': true,

    // 不允许自定义属性缺少 var 函数
    'custom-property-no-missing-var-function': true,

    // 禁止未知的属性
    'property-no-unknown': true,

    // 在keyframe声明中禁止 !important
    'keyframe-declaration-no-important': true,

    // 禁止在声明块中重复自定义属性
    'declaration-block-no-duplicate-custom-properties': true,
    // 禁止声明块中的重复属性
    'declaration-block-no-duplicate-properties': true,
    // 禁止覆盖简写属性
    'declaration-block-no-shorthand-property-overrides': true,

    // 禁止空块
    'block-no-empty': true,

    // 禁止未知的伪类选择器
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    // 禁止未知的伪元素选择器
    'selector-pseudo-element-no-unknown': true,
    // 禁止未知类型选择器
    'selector-type-no-unknown': true,

    // 禁止未知媒体功能名称
    'media-feature-name-no-unknown': true,

    // 禁止未知规则
    'at-rule-no-unknown': true,

    // 禁止空注释
    'comment-no-empty': true,

    // 样式表中禁止出现重复的@import 规则
    'no-duplicate-at-import-rules': true,
    // 禁止样式表中的重复选择器
    'no-duplicate-selectors': true,
    // 禁止空源
    'no-empty-source': true,
    // 样式表中禁止无效位置的 @import
    'no-invalid-position-at-import-rule': true
  }
}
