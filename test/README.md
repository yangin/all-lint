# code-style

A library for code style, includes Prettier、ESLint、StyleLint.

# Installation

```bash
npm install code-style --save-dev
```

# Usage

## ESLint

用来检查 javascript、typescript 文件

### Configuration

项目根目录添加 ESLint 配置文件（及忽略文件 .eslintignore）

.eslintrc.js

```js
{
  "extends": "code-style/config/eslint",
  "rules": {}
}
```

### Code Integrity

package.json

```json
{
  "scripts": {
    "lint:js": "eslint --cache **/*.{js,jsx,ts,tsx}",
    "lint-fix:js": "eslint --cache **/*.{js,jsx,ts,tsx} --fix"
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
  // 配置javascript的格式化工具是eslint
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
```

## StyleLint

用来检测 css、scss、less 文件

### Configuration

项目根目录中添加 StyleLint 配置文件（及忽略文件 .stylelintignore）， 如.stylelintrc.js：

```js
{
  "extends": "code-style/config/stylelint",
  "rules": {}
}
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
  "[css, less, scss]": {
   "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
```

## Prettier

用来检测除 ESLint、StyleLint 以外的文件， 如 json、html、markdown、yaml 等

### Configuration

在项目根目录添加 Prettier 配置文件（及忽略文件 .prettierignore）， 如.prettierrc.js：

```js
{
  "extends": "code-style/config/prettier",
  "rules": {}
}
```

### Code Integrity

package.json

```json
{
  "scripts": {
    "lint:prettier": "prettier **/*.{html,json,md} --check",
    "lint-fix:prettier": "prettier **/*.{html,json,md} --write"
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

# Q&A

Q: Prettier、ESLint、StyleLint 之间的规则冲突了怎么办？

A: 通过区别配置各个检查器检查的文件格式，来避免规则冲突。
