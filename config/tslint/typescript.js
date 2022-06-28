/**
 * For typescript
 * TODO: 继续完善
 */
module.exports = {
  rules: {
    // 要求成员重载是连续的
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // 要求总是使用[]来定义数组type, 如 const x: string[] = ['a', 'b'];
    '@typescript-eslint/array-type': ['error', { default: 'array' }],

    // 禁止在没有.then方法的对象上使用await语法
    // '@typescript-eslint/await-thenable': 'error',

    // 要求类中的文字以字段的的方式对外暴露，而不是方法，如getter
    '@typescript-eslint/class-literal-property-style': ['error', 'fields']

    // 要求构造泛型在定义的左侧， 如 const map: Map<string, number> = new Map();
    // '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation']

  }
}
