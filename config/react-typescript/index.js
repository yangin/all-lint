/**
 * For react in typescript
 */
module.exports = {
  extends: [
    '../eslint/best-practices',
    '../eslint/errors',
    '../eslint/node',
    '../eslint/style',
    '../eslint/variables',
    '../eslint/es6',
    '../eslint/imports',
    '../react/react',
    '../react/react-hooks'
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  plugins: ['react', 'jest', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
    },
    requireConfigFile: false,
    ecmaFeatures: { jsx: true }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.d.ts', '.json', '.js', '.jsx']
      }
    },
    'import/extensions': ['.ts', '.tsx', '.d.ts', '.json', '.js', '.jsx']
  },
  overrides: [{
    files: ['**/*.{ts,tsx}'],
    parser: '@typescript-eslint/parser',
    extends: [
      require.resolve('../tslint/typescript'),
      'plugin:@typescript-eslint/recommended'
    ]
  }]
}
