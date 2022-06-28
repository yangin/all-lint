/**
 * 原则：代码更加美观，简洁明了，能少则少
 */

module.exports = {
  // 指定行长度240, 这样可以将一些强逻辑写在一起，更方便阅读
  printWidth: 240,
  // 指定缩进宽为2，可以在html中写更多的内容
  tabWidth: 2,
  // 禁止使用Tabs进行缩进
  useTabs: false,
  // 禁止在语句结尾是否使用分号，default: true
  semi: false,
  // 使用单引号替代双引号
  singleQuote: true,
  // Object中的Key的引号，始终保持一致, default: as-needed
  quoteProps: 'consistent',
  // 在jsx中使用单引号替代双引号，default: false
  jsxSingleQuote: true,
  // 在Object中的末尾追加逗号，default: es5
  trailingComma: 'none',
  // Object的{}与内容之间添加空格，如{ foo: bar }
  bracketSpacing: true,
  // 在多行HTML元素中，标签的 > 单独起一行，禁止与属性在一行
  bracketSameLine: false,
  // 在Jsx中，禁止多行的HTML中标签的>与属性在同一行
  jsxBracketSameLine: false,
  // 当箭头函数存在唯一的参数时，参数必须携带括号, 方便扩展
  arrowParens: 'always',
  // 格式化文件的开始位置
  rangeStart: 0,
  // 格式化文件的结束位置
  rangeEnd: Infinity,
  // 设置转换器，默认根据文件路径自动识别
  parser: null,
  // 是否只格式化特殊注释的文件
  requirePragma: false,
  insertPragma: false,
  // *是否自动折行
  proseWrap: 'never',
  // *html标签中的空格敏感度按css的规则
  htmlWhitespaceSensitivity: 'css',
  // Vue 文件中 <script> 和 <style> 标签内的代码禁止缩进
  vueIndentScriptAndStyle: false,
  // 文件末尾添加换行符
  // endOfLine: 'lf',
  // 自动格式化文件中嵌入的代码， 如markdown中的代码块, jsx中的html块
  embeddedLanguageFormatting: 'auto',
  // 禁止在HTML, Vue , JSX中每行只能有单个属性
  singleAttributePerLine: false
}
