module.exports = {
  rules: {
    // 要求用小数来指定色值的alpha-value, 如 a { color: rgb(0 0 0 / 0.5) }
    'alpha-value-notation': 'number',

    // 要求颜色的色调度数用数字表示，如 a { color: hsl(198 28% 50%) }
    'hue-degree-notation': 'number',

    // 要求颜色函数采用传统的函数格式，如 a { color: rgba(12, 122, 231, 0.2) }
    'color-function-notation': 'legacy',
    // 要求hex格式的颜色值能简写的必须采用简写，如 a { color: #fff }
    'color-hex-length': 'short',
    // 禁止以名称来作为颜色值，如 a { color: red; }
    'color-named': 'never',

    // 禁止值为0时携带单位，如 a { margin: 0; }
    'length-zero-no-unit': true,

    // 要求应在字体系列名称周围使用引号，如 a { font-family: 'Times New Roman', Times, serif; }
    'font-family-name-quotes': 'always-where-recommended',

    // 要求font-weight必须是数字，如 a { font-weight: 500; }
    'font-weight-notation': 'numeric',

    // 要求url方法里的url必须携带引号，如 a { background: url(‘http://example.com/image.png’); }
    'function-url-quotes': 'always',

    // 要求keyframes的name必须为^([a-z][a-z0-9]*)(-[a-z0-9]+)*$ 格式
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected keyframe name to be kebab-case'
      }
    ],

    // 要求数字中的小数点后最多保留2位
    'number-max-precision': 2,

    // 禁止简写属性中存在冗余值，如 a { margin: 0 0 0 0; } 不被允许
    'shorthand-property-no-redundant-values': true,

    // 禁止属性值的供应商前缀，如 a { display: -webkit-flex; } 是不被允许的, postCSS会自动追加？
    'value-no-vendor-prefix': true,

    // 自定义属性名的命名规则，英文、数字、中划线
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case'
      }
    ],

    // 禁止属性的供应商前缀，如 a { -webkit-transform: scale(1); } 是不被允许的, postCSS会自动追加
    'property-no-vendor-prefix': true,

    // 禁止在声明里使用！important, 如 a { color: red !important; } 是不被允许的
    'declaration-no-important': true,

    // 当属性可以简写时，使用简写
    'declaration-block-no-redundant-longhand-properties': true,
    // 要求块中每行只能声明一个属性
    'declaration-block-single-line-max-declarations': 1,

    // 要求选择器的属性值必须使用引号，如 [target="_blank"] {}
    'selector-attribute-quotes': 'always',
    // 类选择器名要求为kebab-case，中划线连接，如 .foo-bar {}
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    // 要求id选择器名要求为kebab-case，中划线连接，如 #foo-bar {}
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected id selector to be kebab-case'
      }
    ],

    // 禁止媒体功能名称使用供应商前缀， 如 @media (-webkit-min-device-pixel-ratio: 1) {} 不被允许
    'media-feature-name-no-vendor-prefix': true,

    // 要求自定义媒体查询名称为kebab-case，中划线连接，如 @media (--foo: 0) {}
    'custom-media-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom media query name to be kebab-case'
      }
    ],

    // 禁止供应商前缀， 如 @-webkit-keyframes { 0% { top: 0; } } 是不被允许的
    'at-rule-no-vendor-prefix': true,

    // 禁止使用不规则空格
    'no-irregular-whitespace': true,

    // 禁止使用未知的动画，即要求动画的 @keyframes 要在当前页面有定义
    'no-unknown-animations': true
  }
}
