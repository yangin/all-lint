const inquirer = require('inquirer')
const { checkNodeEnv, checkLanguagePreset } = require('./helper')

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
  console.log('init')
}

module.exports = {
  init
}
