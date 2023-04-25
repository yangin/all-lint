const fs = require('fs')
const { execSync } = require('child_process')
const chalk = require('chalk')
const {
  isIncludeArray,
  filterReg,
  getProcessDir,
  getPackageJsonPath,
  getFileListInDir,
  writeFileSync
} = require('./util')
const {
  LANGUAGE_PRESETS,
  COMMITLINT_PRESETS,
  ESLINT_PRESETS,
  STYLELINT_PRESETS,
  PRETTIER_PRESETS,
  ALL_LINT_DEPENDENCIES_REGEXP,
  LINT_DEPENDENCIES
} = require('./constant')
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
 * return { installedLintName, installedLintConfigList }
 */
const checkLintEnv = () => {
  const processDir = getProcessDir()
  const fileList = getFileListInDir(processDir)
  const eslintConfigs = filterReg(fileList, ESLINT_PRESETS.configRegexp)
  const stylelintConfigs = filterReg(fileList, STYLELINT_PRESETS.configRegexp)
  const commitlintConfigs = filterReg(fileList, COMMITLINT_PRESETS.configRegexp)
  const prettierConfigs = filterReg(fileList, PRETTIER_PRESETS.configRegexp)

  const installedLintName = [] // 已经安装的lint工具名
  const installedLintConfigList = [] // 已经安装的lint工具配置文件列表
  if (eslintConfigs.length > 0) {
    installedLintName.push('ESLint')
    installedLintConfigList.push(...eslintConfigs)
  }
  if (stylelintConfigs.length > 0) {
    installedLintName.push('StyleLint')
    installedLintConfigList.push(...stylelintConfigs)
  }
  if (commitlintConfigs.length > 0) {
    installedLintName.push('CommitLint')
    installedLintConfigList.push(...commitlintConfigs)
  }
  if (prettierConfigs.length > 0) {
    installedLintName.push('Prettier')
    installedLintConfigList.push(...prettierConfigs)
  }

  return {
    installedLintName,
    installedLintConfigList
  }
}

/**
 * 移除package.json文件中dependencies中的lint相关依赖
 */
const removeLintDependencies = () => {
  const packagePath = getPackageJsonPath()
  writePackageJson(packagePath, (packageJson) => {
    const { dependencies, devDependencies, optionalDependencies } = packageJson
    const dependenciesList = [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(optionalDependencies)]
    const lintDependencies = filterReg(dependenciesList, ALL_LINT_DEPENDENCIES_REGEXP)
    lintDependencies.forEach((item) => {
      delete dependencies[ item ]
      delete devDependencies[ item ]
      delete optionalDependencies[ item ]
    })
    return packageJson
  })
}

/**
 * 添加dependencies到package.json文件的devDependencies中, 并排序
 * @param {string[]} dependencies 依赖列表, 例如 ['eslint@^8.39.0', 'prettier@^2.8.8']
 */
const addLintDependencies = (dependencies) => {
  const packagePath = getPackageJsonPath()
  writePackageJson(packagePath, (packageJson) => {
    const { devDependencies = {} } = packageJson
    dependencies.forEach((item) => {
      const [name, version] = item.split('@^')
      devDependencies[ `${name}` ] = `^${version}`
    })
    packageJson.devDependencies = sortDependencies(devDependencies)
    return packageJson
  })
}

/**
 * 排序dependencies
 */
const sortDependencies = (dependencies) => {
  const dependenciesList = Object.keys(dependencies)
  const sortedDependencies = {}
  dependenciesList.sort().forEach((item) => {
    sortedDependencies[ item ] = dependencies[ item ]
  })
  return sortedDependencies
}

/**
 * 写入package.json文件
 * @param {string} packagePath
 * @param {function} callback
 */
const writePackageJson = (packagePath, callback) => {
  const packageJson = require(packagePath)
  const newPackageJson = callback(packageJson)
  fs.WriteStream(packagePath, {
    encoding: 'utf-8'
  }).write(JSON.stringify(newPackageJson, null, 2))
}

/**
 * 根据目标环境安装lint相关依赖
 */
const installLintDependencies = (target) => {
  // 根据目标环境得到lint要素
  const lintFeatures = getLintFeatures(target)
  // 根据lint要素得到lint的所有依赖
  const lintDependencies = getLintDependencies(lintFeatures)
  // 根据dependencies获取最新版本号
  const latestLintDependencies = getLatestLintDependencies(lintDependencies)
  // 将lint依赖写入package.json
  addLintDependencies(latestLintDependencies)
}

/**
 * 根据target得到lintFeatures
 * lintFeatures的值为 LINT_DEPENDENCIES 里的keys
 */
const getLintFeatures = (target) => {
  const { language, react, styleLanguage, commitLint } = target
  const lintFeatures = []
  if (language === 'javascript') {
    lintFeatures.push('javascript')
  } else {
    lintFeatures.push('javascript', 'typescript')
  }

  if (react) {
    lintFeatures.push('react')
  }

  if (styleLanguage === 'css') {
    lintFeatures.push('css')
  } else {
    lintFeatures.push('css', 'less')
  }

  if (commitLint) {
    lintFeatures.push('commitlint')
  }

  lintFeatures.push('prettier')
  return lintFeatures
}

/**
 * 根据lint要素得到lint的所有依赖
 * @param {string[]} lintFeatures
 * @returns
 */
const getLintDependencies = (lintFeatures) => {
  const lintDependencies = []
  lintFeatures.forEach((item) => {
    lintDependencies.push(...LINT_DEPENDENCIES[ item ])
  })
  return lintDependencies
}

/**
 * 根据依赖列表获取依赖的版本号
 */
const getLatestLintDependencies = (dependencies) => {
  const dependenciesList = []
  dependencies.forEach((item) => {
    const latestVersion = execSync(`npm view ${item} version`).toString()
      .trim()
    dependenciesList.push(`${item}@^${latestVersion}`)
  })
  return dependenciesList
}

module.exports = {
  checkNodeEnv,
  checkLanguagePreset,
  checkLintEnv,
  removeLintDependencies,
  installLintDependencies
}
