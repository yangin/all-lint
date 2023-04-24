const path = require('path')
const fs = require('fs')

/**
 * 目标数组中是否包含子数组的所有元素
 * @param {*} target
 * @param {*} sub
 */
const isIncludeArray = (target, sub) => sub.every((item) => target.includes(item))

/**
 * 获取进程当前执行的目录
 */
const getProcessDir = () => process.cwd()

/**
 * 获取安装项目的package.json文件路径
 * @returns {string}
 */
const getPackageJsonPath = () => `${getProcessDir()}/package.json`

/**
 * 获取文件夹下的所有文件名列表
 * @param {string} dirPath 文件夹路径
 */
const getFileListInDir = (dirPath) => {
  const dir = fs.readdirSync(dirPath)
  return dir
}

module.exports = {
  isIncludeArray,
  getProcessDir,
  getPackageJsonPath,
  getFileListInDir
}
