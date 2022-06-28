# code-style

A library for code style, includes Prettier、ESLint、StyleLint.

# Installation

```bash
npm install @yangin/code-style --save-dev

# 引用react还需添加
npm install @babel/preset-env @babel/preset-react --save-dev

# 引用react-typescript还需添加
npm install @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript typescript --save-dev
```

# Usage

## ESLint

用来检查 javascript、typescript 文件，规则包括：

- eslint
- tslint
- react
- react-typescript

### Configuration

项目根目录添加 ESLint 配置文件（及忽略文件 .eslintignore）

.eslintrc.js

```js
// 当需要添加新的rules时
module.exports = {
  extends: [require.resolve("@yangin/code-style/config/eslint")],
  rules: {},
};
```

或者

```js
const linter = require("@yangin/code-style");

module.exports = {
  ...linter.eslint,
};
```

### Code Integrity

package.json

```json
{
  "scripts": {
    "lint:js": "eslint --ext .js,.jsx,.ts,.tsx ./src",
    "lint-fix:js": "eslint --ext .js,.jsx,.ts,.tsx ./src --fix"
  }
}
```

### VSCode Integration

setting.json

```json
  // 关闭自带的js format
  "javascript.format.enable": false,
  // 启动Editor在保存时格式化代码功能
  "editor.formatOnSave": true,
  // 保存时自动格式化代码
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
  },
  // ESLint校验的语言
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  // 配置javascript的格式化工具是eslint
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
```

## StyleLint

用来检测 css、scss、less 文件

### Configuration

项目根目录中添加 StyleLint 配置文件（及忽略文件 .stylelintignore）， 如.stylelintrc.js：

```js
// 当需要添加新的rules时
module.exports = {
  extends: [require.resolve("@yangin/code-style/config/stylelint")],
  rules: {},
};
```

或者

```js
const linter = require("@yangin/code-style");

module.exports = {
  ...linter.stylelint,
};
```

### Code Integrity

package.json

```json
{
  "scripts": {
    "lint:style": "stylelint **/*.{css,less,scss}",
    "lint-fix:style": "stylelint **/*.{css,less,scss} --fix"
  }
}
```

### VSCode Integration

setting.json

```json
  // 启动Editor在保存时格式化代码功能
  "editor.formatOnSave": true,
  // 保存时自动格式化代码
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
  },
  // 配置样式文件的格式化工具是stylelint
  "[css]": {
   "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[less]": {
   "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[scss]": {
   "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
```

## Prettier

用来检测除 ESLint、StyleLint 以外的文件， 如 json、html、markdown、yaml 等

### Configuration

在项目根目录添加 Prettier 配置文件（及忽略文件 .prettierignore）， 如.prettierrc.js：

```js
// 当需要添加新的rules时
module.exports = {
  extends: [require.resolve("@yangin/code-style/config/prettier")],
  rules: {},
};
```

或者

```js
const linter = require("@yangin/code-style");

module.exports = {
  ...linter.prettier,
};
```

### Code Integrity

package.json

```json
{
  "scripts": {
    "lint:prettier": "prettier **/*.{html,json,ejs,md} --check",
    "lint-fix:prettier": "prettier **/*.{html,json,ejs,md} --write"
  }
}
```

### VSCode Integration

setting.json

```json
  // 启动Editor在保存时格式化代码功能
  "editor.formatOnSave": true,
  // 保存时自动格式化代码
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
  },
  // 配置默认的格式化工具是prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
```

# Note

- Linter 匹配的路径越精确(by [fast-global](https://github.com/mrmlnc/fast-glob#advanced-syntax))，其效率越高

- 如果 node 版本 < 16.0.0，请在项目的 package.json 中添加依赖：

  > 因为 node 自 16 版本以后才支持 peerDependencies 自动安装

  ```bash
  npm install -D eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise prettier stylelint stylelint-order
  ```

# Q&A

Q: Prettier、ESLint、StyleLint 之间的规则冲突了怎么办？

A: 通过区别配置各个检查器检查的文件格式，来避免规则冲突。
