const { execSync } = require('child_process')
const chalk = require('chalk')
const { isIncludeArray, getProcessDir, getPackageJsonPath, getFileListInDir } = require('./util')
const { LANGUAGE_PRESETS } = require('./constant')
/**
 * 检查node环境 >= 16
 */
const checkNodeEnv = () => {
  const version = execSync('node -v')
  const versionNum = version.toString().split('.')[ 0 ].split('v')[ 1 ]
  if (versionNum < 16) {
    console.log(chalk.red('node版本过低，请升级至16以上'))
    return false
  }
  return true
}

/**
 * 检测目标环境的预制依赖是否已经安装
 * @param {*} target 目标环境 { language, react, styleLanguage }
 * @returns boolean true: 已经安装 false: 未安装
 */
const checkLanguagePreset = (target) => {
  const { language, react, styleLanguage } = target
  // 获取项目的package.json, 根据配置目标检查dependencies是否已经安装
  const packagePath = getPackageJsonPath()
  const { dependencies, devDependencies } = require(packagePath)
  const dependenciesList = [...Object.keys(dependencies), ...Object.keys(devDependencies)]
  if (!isIncludeArray(dependenciesList, LANGUAGE_PRESETS.webpack)) {
    console.log(chalk.red('项目未安装webpack'))
    return false
  }
  if (language === 'typescript' && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.typescript)) {
    console.log(chalk.red('项目未安装typescript解析器'))
    return false
  }
  if (!isIncludeArray(dependenciesList, LANGUAGE_PRESETS.css)) {
    console.log(chalk.red('项目未安装css解析器'))
    return false
  }
  if (styleLanguage === 'less' && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.less)) {
    console.log(chalk.red('项目未安装less解析器'))
    return false
  }
  if (react && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.react)) {
    console.log(chalk.red('项目未安装react解析器'))
    return false
  }
  return true
}

/**
 * 检查lint环境是否已经安装
 * @param {*} target 目标环境 { language, react, styleLanguage，commitLint }
 */
const checkLintEnv = (target) => {
  console.log('target', target)
}

module.exports = {
  checkNodeEnv,
  checkLanguagePreset,
  checkLintEnv
}
