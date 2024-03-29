# All-Lint

A library for code style, includes Prettier、ESLint、StyleLint、CommitLint.

# Installation

Node >= 16.0.0

```bash
npm i all-lint -D
```

> 正确使用前，项目需要配置相应语法识别器（通过 babel 配置）, 如：react、typescript、less 等。

## Auto Install

```bash
npx all-lint init
```

该命令会执行以下内容：

- 移除项目中已存在的 Prettier、ESLint、StyleLint、CommitLint 相关的依赖和配置
- 在 package.json devDependencies 中添加 Lint 相关的依赖
- 在 package.json scripts 中添加 Lint 相关的命令
- 在 package.json 中添加 lint-staged 配置
- 在项目根目录下生成 Lint 配置文件，如 .eslintrc.js、.stylelintrc.js 等。
- 在项目根目录下生成 .vscode/settings.json 文件，用来配置 VSCode 的 ESLint、StyleLint 插件。
- 在项目根目录下生成 .husky/pre-commit、 commit-msg 文件，用来配置 git hooks。

## Manual Install

### 安装依赖

支持 typescript

```bash
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

支持 React

```bash
npm i eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jest -D
```

支持 Less

```bash
npm i postcss-less -D
```

### 使用 commitlint 的预制安装

#### 安装[husky](https://github.com/typicode/husky)

```bash
# 建议安装 7+ 版本
npm i husky -D
```

并在 package.json 中进行如下配置:

```json
"scripts": {
  "prepare": "husky install",
}
```

> 该命令从 7+ 后，会在每次 npm install 时，在.git/config 里追加一条配置: `hooksPath = .husky`, 用来指定 git hooks 的配置文件路径。在 <7 的版本中是覆盖 .git/hooks 目录。

然后添加 hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 安装[lint-staged](https://github.com/okonet/lint-staged)

```bash
npm i lint-staged -D
```

在 package.json 中添加如下配置,用来设置 lint-staged 的执行行为

```json
  "lint-staged": {
    "**/*.less": "stylelint --fix",
    "**/*.{ts,tsx,js,jsx}": "eslint --ext .js,.jsx,.ts,.tsx --fix",
    "**/*.{html,json,ejs,md}": "prettier --write"
  },
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
  extends: [require.resolve("all-lint/config/eslint")],
  rules: {},
};
```

或者

```js
const linter = require("all-lint");

module.exports = {
  ...linter.eslint,
};
```

### Code Integrity

package.json 文件中

scripts

```json
{
  "scripts": {
    "lint:js": "eslint --ext .js,.jsx,.ts,.tsx ./src",
    "lint-fix:js": "eslint --ext .js,.jsx,.ts,.tsx ./src --fix"
  }
}
```

lint-staged

```json
  "lint-staged": {
    "**/*.{ts,tsx,js,.jsx}": "eslint --ext .ts,.tsx,.js,.jsx"
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

用来检测 css、scss、less 文件, 规则包括：

- stylelint
- lesslint

### Configuration

项目根目录中添加 StyleLint 配置文件（及忽略文件 .stylelintignore）， 如.stylelintrc.js：

```js
// 当需要添加新的rules时
module.exports = {
  extends: [require.resolve("all-lint/config/stylelint")],
  rules: {},
};
```

或者

```js
const linter = require("all-lint");

module.exports = {
  ...linter.stylelint,
};
```

### Code Integrity

package.json 文件中

scripts

```json
{
  "scripts": {
    "lint:style": "stylelint \"**/*.{css,less,scss}\"",
    "lint-fix:style": "stylelint \"**/*.{css,less,scss}\" --fix"
  }
}
```

> 注意，这里的路径需要用双引号或单引号包括起来，否则路径无法识别嵌套目录

lint-staged

```json
  "lint-staged": {
      "**/*.less": "stylelint",
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
const linter = require("all-lint");

module.exports = {
  ...linter.prettier,
};
```

### Code Integrity

package.json 文件中

scripts

```json
{
  "scripts": {
    "lint:prettier": "prettier **/*.{html,json,ejs,md} --check",
    "lint-fix:prettier": "prettier **/*.{html,json,ejs,md} --write"
  }
}
```

lint-staged

```json
  "lint-staged": {
    "**/*.{html,json,ejs,md}": "prettier --check"
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

## CommitLint

用来校验 git commit message 格式规范

### Configuration

第一步：集成 [husky](https://typicode.github.io/husky/#/)(若已集成，则省略此步骤)

```bash
npx husky-init && npm install
```

第二步：集成[commitlint](https://github.com/conventional-changelog/commitlint),在 husky 中添加 commit-msg hooks

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

执行成功后，会新增一个 ./husky/commit-msg 文件

第三步：项目根目录中添加 CommitLint 配置文件， 如.commitlintrc.js：

```js
module.exports = {
  extends: [require.resolve("all-lint/config/commitlint")],
  rules: {},
};
```

# Note

- Linter 匹配的路径越精确(by [fast-global](https://github.com/mrmlnc/fast-glob#advanced-syntax))，其效率越高

- 如果 node 版本 < 16.0.0，请在项目的 package.json 中添加依赖：

  > 因为 node 自 16 版本以后才支持 peerDependencies 自动安装

- 必要情况下可通过`git commit --no-verify`跳过 commitlint 检查

# Q&A

Q: Prettier、ESLint、StyleLint 之间的规则冲突了怎么办？

A: 通过区别配置各个检查器检查的文件格式，来避免规则冲突。
