module.exports = {
  env: {
    node: true
  },
  plugins: [
    'node'
  ],
  rules: {
    // 要求回调函数中有容错处理
    'handle-callback-err': ['error', '^(err|error)$'],

    // 禁止调用 require 时使用 new 操作符
    'no-new-require': ['error'],

    // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-path-concat': ['error'],

    // 禁止使用已弃用的api
    'node/no-deprecated-api': ['error'],

    // 要求process.exit() 与 throw 在相同代码路径下
    'node/process-exit-as-throw': ['error']
  }
}
