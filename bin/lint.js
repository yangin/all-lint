const inquirer = require('inquirer')
const { removeFiles } = require('./util')
const {
  checkNodeEnv,
  checkLanguagePreset,
  checkLintEnv,
  removeLintDependencies,
  installLintDependencies
} = require('./helper')

const chat = async () => {
  const { language, react, styleLanguage, commitLint } = await inquirer.prompt([
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
          name: 'NodeJs',
          value: 'nodejs'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'react',
      message: '是否使用了React库?'
    },
    {
      type: 'list',
      name: 'styleLanguage',
      message: '请选择样式语言',
      choices: [
        {
          name: 'css',
          value: 'css'
        },
        {
          name: 'less',
          value: 'less'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'commitLint',
      message: '是否建立Git Commit规范?'
    }
  ])

  return { language, react, styleLanguage, commitLint }
}

const init = async () => {
  // 检查node环境
  const isNodeEnvOk = checkNodeEnv()
  if (!isNodeEnvOk) return

  // 询问要配置的lint目标
  const { language, react, styleLanguage, commitLint } = await chat()

  // 检测目标环境的预制依赖是否已经安装
  const isPresetInstalled = checkLanguagePreset({ language, react, styleLanguage })
  if (!isPresetInstalled) return

  // 检查lint的配置文件是否已存在
  const { installedLintName, installedLintConfigList } = checkLintEnv()

  // 当配置文件已存在时，询问是否覆盖
  if (installedLintName.length > 0) {
    const { isOverride } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isOverride',
        message: `检测到已存在${installedLintName.join('、')}的配置文件，是否覆盖？`
      }
    ])
    if (!isOverride) {
      console.log('已取消初始化')
      return
    }

    // 当配置文件已存在时，移除已存在的配置文件与依赖
    removeFiles(installedLintConfigList)
    removeLintDependencies()
    console.log('移除已存在的配置文件与依赖')
  }
  // 安装依赖
  installLintDependencies({ language, react, styleLanguage, commitLint })
  // 生成配置文件
}

module.exports = {
  init
}
