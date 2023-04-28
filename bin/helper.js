const path = require('path')
const { execSync, exec } = require('child_process')
const chalk = require('chalk')
const {
  isIncludeArray,
  filterReg,
  getProcessDir,
  getPackageJsonPath,
  getFileListInDir,
  writeFileSync,
  appendFileSync,
  getAbsolutePath,
  isExistFileInDir
} = require('./util')
const {
  LANGUAGE_PRESETS,
  COMMITLINT_PRESETS,
  ESLINT_PRESETS,
  STYLELINT_PRESETS,
  PRETTIER_PRESETS,
  ALL_LINT_DEPENDENCIES_REGEXP,
  LINT_DEPENDENCIES,
  VSCODE_EXTENSIONS
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
 * @param {string[]} lintFeatures 目标环境要素 ['typescript', 'react', 'less']
 * @returns boolean true: 已经安装 false: 未安装
 */
const checkLanguagePreset = (lintFeatures) => {
  // 获取项目的package.json, 根据配置目标检查dependencies是否已经安装
  const packagePath = getPackageJsonPath()
  const { dependencies, devDependencies } = require(packagePath)
  const dependenciesList = [...Object.keys(dependencies), ...Object.keys(devDependencies)]

  const unInstalledCompiler = [] // 未安装的编译器
  if (lintFeatures.includes('typescript') && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.typescript)) {
    unInstalledCompiler.push('Typescript')
  }
  if (lintFeatures.includes('css') && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.css)) {
    unInstalledCompiler.push('Css')
  }
  if (lintFeatures.includes('less') && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.less)) {
    unInstalledCompiler.push('Less')
  }
  if (lintFeatures.includes('react') && !isIncludeArray(dependenciesList, LANGUAGE_PRESETS.react)) {
    unInstalledCompiler.push('React')
  }

  if (unInstalledCompiler.length > 0) {
    console.log(chalk.red(`\n检测到${unInstalledCompiler.join('、')}编译器未安装，请先安装`))
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
    const { dependencies = {}, devDependencies = {}, optionalDependencies = {}, scripts = {} } = packageJson
    const dependenciesList = [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(optionalDependencies)]
    const lintDependencies = filterReg(dependenciesList, ALL_LINT_DEPENDENCIES_REGEXP)
    lintDependencies.forEach((item) => {
      delete dependencies[ item ]
      delete devDependencies[ item ]
      delete optionalDependencies[ item ]
    })
    scripts[ 'prepare' ] && delete scripts[ 'prepare' ]
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
 * 添加lint执行脚本到package.json文件的scripts中，以及 lint-staged配置
 */
const addLintScripts = (lintFeatures) => {
  const packagePath = getPackageJsonPath()
  writePackageJson(packagePath, (packageJson) => {
    const { scripts = {}, 'lint-staged': lintStaged = {} } = packageJson

    if (lintFeatures.includes('typescript')) {
      scripts[ 'lint:js' ] = 'eslint --ext .js,.jsx,.ts,.tsx ./src'
      scripts[ 'lint-fix:js' ] = 'eslint --ext .js,.jsx,.ts,.tsx ./src --fix'
      lintStaged[ '**/*.{ts,tsx,js,.jsx}' ] = 'eslint --ext .ts,.tsx,.js,.jsx'
    } else if (lintFeatures.includes('javascript')) {
      scripts[ 'lint:js' ] = 'eslint --ext .js,.jsx ./src'
      scripts[ 'lint-fix:js' ] = 'eslint --ext .js,.jsx ./src --fix'
      lintStaged[ '**/*.{js,.jsx}' ] = 'eslint --ext .js,.jsx'
    }

    if (lintFeatures.includes('less')) {
      scripts[ 'lint:css' ] = 'stylelint "**/*.{css,less}"'
      scripts[ 'lint-fix:css' ] = 'stylelint "**/*.{css,less}" --fix'
      lintStaged[ '**/*.{css,less}' ] = 'stylelint'
    } else if (lintFeatures.includes('css')) {
      scripts[ 'lint:css' ] = 'stylelint "**/*.css"'
      scripts[ 'lint-fix:css' ] = 'stylelint "**/*.css" --fix'
      lintStaged[ '**/*.css' ] = 'stylelint'
    }

    if (lintFeatures.includes('prettier')) {
      scripts[ 'lint:prettier' ] = 'prettier --check "**/*.{html,json,md}"'
      scripts[ 'lint-fix:prettier' ] = 'prettier --write "**/*.{html,json,md}"'
      lintStaged[ '**/*.{html,json,md}' ] = 'prettier --check'
    }
    scripts[ 'prepare' ] = 'husky install'

    packageJson.scripts = scripts
    packageJson[ 'lint-staged' ] = lintStaged
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
  writeFileSync(packagePath, JSON.stringify(newPackageJson, null, 2))
}

/**
 * 检查指定package是否已安装在package.json的dependencies中
 * @param {string[]} packageNames 依赖列表, 例如 ['husky', 'lint-stage']
 * @returns {boolean[]} 依赖是否已安装列表
 */
const checkInstalledPackage = (packageNames) => {
  const packagePath = getPackageJsonPath()
  const { dependencies = {}, devDependencies = {}, optionalDependencies = {} } = require(packagePath)
  const dependenciesList = [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(optionalDependencies)]
  return packageNames.map((item) => dependenciesList.includes(item))
}

/**
 * 根据目标环境安装lint相关依赖
 */
const installLintDependencies = async (lintFeatures) => {
  // 根据lint要素得到lint的所有依赖
  const lintDependencies = getLintDependencies(lintFeatures)

  // 检查 husky、lint-staged 是否已经安装
  const [isInstalledHusky, isInstalledLintStaged] = checkInstalledPackage(['husky', 'lint-staged'])
  !isInstalledHusky && lintDependencies.push('husky')
  !isInstalledLintStaged && lintDependencies.push('lint-staged')

  // 根据dependencies获取最新版本号
  const latestLintDependencies = await getLatestLintDependencies(lintDependencies)
  // 将lint依赖写入package.json
  addLintDependencies(latestLintDependencies)

  // 检查删除prepare脚本
  const packageJsonPath = getPackageJsonPath()
  const { scripts = {} } = require(packageJsonPath)
  scripts.prepare && execSync('npm pkg delete script.prepare')

  // 执行npm install
  execSync('npm install')

  setPackageJsonSettings([{ 'scripts.prepare': 'husky install' }])
  execSync('npm run prepare')
}

/**
 * 根据target得到lintFeatures
 * lintFeatures的值为 LINT_DEPENDENCIES 里的keys
 * @param {object} target chatTarget
 * @returns { {lintFeature: string[], lintPluginTools: string[]} }
 */
const getLintFeatures = (target) => {
  const { language, framework, styleLanguage } = target
  const lintFeatures = []
  const lintTools = []
  if (language === 'javascript') {
    lintFeatures.push('javascript')
    lintTools.push('eslint')
  } else if (language === 'typescript') {
    lintFeatures.push('javascript', 'typescript')
    lintTools.push('eslint')
  }

  if (framework === 'react') {
    lintFeatures.push('react')
  }

  if (styleLanguage === 'css') {
    lintFeatures.push('css')
    lintTools.push('stylelint')
  } else if (styleLanguage === 'less') {
    lintFeatures.push('css', 'less')
    lintTools.push('stylelint')
  }

  lintFeatures.push('prettier', 'commitlint')
  lintTools.push('prettier')
  return { lintFeatures, lintTools, lintPluginTools: lintTools.map(item => VSCODE_EXTENSIONS[ item ]) }
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
const getLatestLintDependencies = async (dependencies) => {
  const dependenciesList = []
  const promiseList = dependencies.map((item) => new Promise((resolve) => {
    exec(`npm view ${item} version`, (err, stdout) => {
      if (err) {
        console.error(err)
      }
      resolve(stdout.toString().trim())
    })
  }))
  const latestVersions = await Promise.all(promiseList)
  dependencies.forEach((item, index) => {
    dependenciesList.push(`${item}@^${latestVersions[ index ]}`)
  })

  return dependenciesList
}

/**
 * 根据chat target获取lint配置目标
 * @param {string} target
 * @returns {object} lint配置目标 { eslint: 'react', stylelint: 'less', commitlint: 'commitlint', prettier: 'prettier' }
 */
const getLintConfigTarget = (lintFeatures) => {
  const lintTarget = {}
  if (lintFeatures.includes('typescript')) {
    lintTarget.eslint = lintFeatures.includes('react') ? 'react-typescript' : 'tslint'
  } else if (lintFeatures.includes('javascript')) {
    lintTarget.eslint = lintFeatures.includes('react') ? 'react' : 'eslint'
  }

  if (lintFeatures.includes('less')) {
    lintTarget.stylelint = 'lesslint'
  } else if (lintFeatures.includes('css')) {
    lintTarget.stylelint = 'stylelint'
  }

  lintTarget.commitlint = 'commitlint'
  lintTarget.prettier = 'prettier'

  return lintTarget
}

/**
 * 获取当前项目名称
 * @returns {string} 项目名称
 */
const getProjectName = () => {
  const currentPackageJsonPath = getAbsolutePath('../package.json')
  const { name } = require(currentPackageJsonPath)
  return name
}

/**
 * 根据lintTarget批量生成lint配置文件到项目的根目录
 * @param {string} lintFeatures
 */
const generateLintConfigs = (lintFeatures) => {
  // 根据target获取lint配置目标
  const lintTarget = getLintConfigTarget(lintFeatures)
  // 获取当前项目名称
  const projectName = getProjectName()
  const processDir = getProcessDir()
  Object.entries(lintTarget).forEach(([key, value]) => {
    const lintConfigPath = path.join(processDir, `.${key}rc.js`)

    const content =
`module.exports = {
  extends: [require.resolve('${projectName}/config/${value}')],
  rules: {}
}
`
    writeFileSync(lintConfigPath, content)

    if (key === 'commitlint') return
    const lintIgnorePath = path.join(processDir, `.${key}ignore`)
    const ignoreContent = `node_modules
dist
.cache
.vscode
.husky
.idea
.DS_Store`

    writeFileSync(lintIgnorePath, ignoreContent)
  })
}

/**
 * 生产.vscode/settings.json文件
 * 这里为固定内容，包含了eslint（javascript、typescript、react）、prettier等的所有配置
 */
const generateVscodeSettings = () => {
  const processDir = getProcessDir()
  const settingsPath = path.join(processDir, '.vscode/settings.json')
  const isExistSettings = isExistFileInDir(processDir, '.vscode/settings.json')
  const settingsContent = isExistSettings ? require(settingsPath) : {}
  settingsContent[ 'javascript.format.enable' ] = false
  settingsContent[ 'editor.formatOnSave' ] = true
  settingsContent[ 'editor.codeActionsOnSave' ] = {
    'source.fixAll.eslint': true
  }
  settingsContent[ 'eslint.validate' ] = [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact'
  ]
  settingsContent[ '[javascript]' ] = {
    'editor.defaultFormatter': 'dbaeumer.vscode-eslint'
  }
  settingsContent[ '[javascriptreact]' ] = {
    'editor.defaultFormatter': 'dbaeumer.vscode-eslint'
  }
  settingsContent[ '[typescript]' ] = {
    'editor.defaultFormatter': 'dbaeumer.vscode-eslint'
  }
  settingsContent[ '[typescriptreact]' ] = {
    'editor.defaultFormatter': 'dbaeumer.vscode-eslint'
  }
  settingsContent[ '[css]' ] = {
    'editor.defaultFormatter': 'stylelint.vscode-stylelint'
  }
  settingsContent[ '[less]' ] = {
    'editor.defaultFormatter': 'stylelint.vscode-stylelint'
  }
  settingsContent[ '[scss]' ] = {
    'editor.defaultFormatter': 'stylelint.vscode-stylelint'
  }
  settingsContent[ 'editor.defaultFormatter' ] = 'esbenp.prettier-vscode'

  writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 2))
}

/**
 * 生成husky配置文件
 */
const generateHuskyConfig = () => {
  const processDir = getProcessDir()
  const preCommitPath = path.join(processDir, '.husky/pre-commit')
  const commitMsgPath = path.join(processDir, '.husky/commit-msg')
  // 生成.husky/commit-msg文件，这里覆盖原有的commit-msg文件
  const commitMsgContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"`
  writeFileSync(commitMsgPath, commitMsgContent)

  // 生成.husky/pre-commit文件
  // 如果存在.husky/pre-commit文件，则在原有的基础上添加npm run lint-staged命令
  const isExistPreCommit = isExistFileInDir(processDir, '.husky/pre-commit')
  if (isExistPreCommit) {
    appendFileSync(preCommitPath, `npm run lint-staged`)
  } else {
    writeFileSync(preCommitPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged`)
  }
  // 修改.husky/* 文件的权限，以防止报错
  execSync('chmod ug+x .husky/*')
}

/**
 * 设置package.json的配置
 * @param {string|string[]} settings [{key: value}, {key: value}]
 */
const setPackageJsonSettings = (settings) => {
  if (Array.isArray(settings)) {
    let setting = ''
    settings.forEach((item) => {
      setting += `${Object.keys(item)[ 0 ]}='${Object.values(item)[ 0 ]} '`
    })
    execSync(`npm pkg set ${setting.trim()}`)
  }
}

module.exports = {
  checkNodeEnv,
  checkLanguagePreset,
  checkLintEnv,
  getLintFeatures,
  removeLintDependencies,
  installLintDependencies,
  generateLintConfigs,
  generateVscodeSettings,
  addLintScripts,
  generateHuskyConfig
}
