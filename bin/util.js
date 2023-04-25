const path = require('path')
const fs = require('fs')

/**
 * 目标数组中是否包含子数组的所有元素
 * @param {*} target
 * @param {*} sub
 */
const isIncludeArray = (target, sub) => sub.every((item) => target.includes(item))

/**
 * 目标数组中是否存在满足指定正则表达式的元素，存在则返回所有匹配的元素，不存在则返回空数组
 * @param {*} target
 * @param {*} reg
 * @returns {Array}
 */
const filterReg = (target, reg) => target.filter((item) => reg.test(item))

/**
 * 获取进程当前执行的目录
 */
const getProcessDir = () => process.cwd()

/**
 * 获取绝对路径
 * @param {string} targetPath 目标路径
 * @returns
 */
const getAbsolutePath = (targetPath) => targetPath.startsWith('/') ? targetPath : path.resolve(__dirname, targetPath)

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

/**
 * 批量移除指定文件
 */
const removeFiles = (files) => {
  const processDir = getProcessDir()
  files.forEach((file) => {
    const filePath = `${processDir}/${file}`
    fs.unlinkSync(filePath)
  })
}

/**
 * 创建一个文件夹，当上级目录不存在时，自动创建
 * 当前fs.mkdir只能基于上一层目录存在的情况下创建，否则报错
 * @params {string} dirPath 文件夹路径
 */
const mkdir = (dirPath) => {
  const dirArr = getAbsolutePath(dirPath).split('/')
    .slice(1)
  dirArr.forEach(async (dir, index) => {
    const currentDir = `/${dirArr.slice(0, index + 1).join('/')}`
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir)
    }
  })
}

/**
 * 将内容写入到文件中，当文件不存在时，创建该文件
 * fs.writeFileSync 的问题是，当文件的上级目录不存在时，则会报错
 * 此方法会当上级目录不存在时，依次创建上级目录
 * @param {string} filePath 文件路径
 */
const writeFileSync = (filePath, content, option = { flag: 'w+' }) => {
  const parentDirPath = path.dirname(filePath)
  !fs.existsSync(parentDirPath) && mkdir(parentDirPath)
  fs.writeFileSync(filePath, content, option)
}

module.exports = {
  isIncludeArray,
  filterReg,
  getProcessDir,
  getPackageJsonPath,
  getFileListInDir,
  removeFiles,
  writeFileSync
}
