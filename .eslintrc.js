module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    // 代码分号结尾
    semi: "error", // 没有分号结尾报错
    // semi: "warnning", // 没有分号结尾警告
    // semi: "false" // 没有分号结尾不报错不警告
    "space-infix-ops": "error"
  }
};
