const inquirer = require('inquirer')
const chalk = require('chalk')
const { removeFiles } = require('./util')
const { success, loading } = require('./loading')
const {
  checkNodeEnv,
  checkLanguagePreset,
  checkLintEnv,
  getLintFeatures,
  removeLintDependencies,
  installHusky,
  installLintDependencies,
  generateLintConfigs,
  generateVscodeSettings,
  addLintScripts,
  generateHuskyConfig
} = require('./helper')

/**
 * 对话询问项目的基本信息
 * 默认直接安装 Prettier、CommitLint
 * @returns {Promise<{language: string, framework: string, styleLanguage: string}>}
 */
const projectChat = async () => {
  const { language, framework, styleLanguage } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: '请选择项目的语言',
      choices: [
        {
          name: 'JavaScript',
          value: 'javascript'
        },
        {
          name: 'TypeScript',
          value: 'typescript'
        },
        {
          name: 'None',
          value: 'none'
        }
      ]
    },
    {
      type: 'list',
      name: 'framework',
      message: '请选择项目使用框架',
      choices: [
        {
          name: 'React',
          value: 'react'
        },
        {
          name: 'None',
          value: 'none'
        }
      ]
    },
    {
      type: 'list',
      name: 'styleLanguage',
      message: '请选择项目样式语言',
      choices: [
        {
          name: 'Css',
          value: 'css'
        },
        {
          name: 'Less',
          value: 'less'
        },
        {
          name: 'None',
          value: 'none'
        }
      ]
    }
  ])

  return { language, framework, styleLanguage }
}

const init = async () => {
  // 检查node环境
  const isNodeEnvOk = checkNodeEnv()
  if (!isNodeEnvOk) return

  // 询问要配置的lint目标
  const chatTarget = await projectChat()
  const { lintFeatures, lintPluginTools } = getLintFeatures(chatTarget)

  // 检测目标环境的预制依赖是否已经安装
  const isPresetInstalled = checkLanguagePreset(lintFeatures)
  if (!isPresetInstalled) return

  // 检查Lint的配置文件是否已存在
  const { installedLintName, installedLintConfigList } = checkLintEnv()

  // 当配置文件已存在时，询问是否覆盖
  if (installedLintName.length > 0) {
    const { isOverride } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isOverride',
        message: `已存在${installedLintName.join('、')}配置，是否覆盖？`
      }
    ])
    if (!isOverride) {
      console.log('\n已取消初始化')
      return
    }

    const spinner = loading('正在移除已存在Lint配置...')
    // 当配置文件已存在时，移除已存在的配置文件与依赖
    removeFiles(installedLintConfigList)
    removeLintDependencies()
    success('成功移除已存在的Lint配置', spinner)
  }

  const spinner = loading('正在初始化Lint配置...')
  // 安装依赖
  await installLintDependencies(lintFeatures)
  // 安装husky
  installHusky()
  // 生成配置文件
  generateLintConfigs(lintFeatures)
  // 生成.vscode/settings.json 文件
  generateVscodeSettings()
  // 添加lint相关的scripts
  addLintScripts(lintFeatures)
  // 生成husky配置文件
  generateHuskyConfig()
  success('成功初始化Lint配置', spinner)

  console.log(`\n请确认VSCode已安装${chalk.green(lintPluginTools.join('、'))}插件`)
}

module.exports = {
  init
}
