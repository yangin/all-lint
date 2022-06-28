module.exports = {
  plugins: [
    'promise'
  ],
  rules: {
    // 要求在声明参数名时，必须采用标准的 resolve, reject，禁止采用其他的自定义名称
    'promise/param-names': ['error']
  }
}
