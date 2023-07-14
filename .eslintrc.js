// module.exports = {
//   extends: ['react-app'],
//   parserOptions: {
//     babelOptions: {
//       presets: [
//         ['babel-preset-react-app', false],
//         'babel-preset-react-app/prod'
//       ]
//     }
//   },
//   rules: {
//     "no-unused-vars": 'off'
//   }
// }
//  react eslint配置.eslintrc.js
module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  extends: 'eslint:recommended',
  globals: {
    page: true,
    REACT_APP_ENV: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false, // 是否需要 babel 配置文件
    sourceType: 'module', // script 或者 module
    allowImportExportEverywhere: false, // 设置为 true，import 和 export 声明 可以出现在文件的任务位置，否则只能出现在顶部
    ecmaFeatures: {
      globalReturn: false // 设置为 true，当 sourceType 为 script 时，允许全局 return
    },
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    // 'quotes': [1, 2, 'single'], // 单引号
    // 'no-console': ['error', { allow: ['info', 'error'] }],//不允许console,除了console.info和console.error 
    'no-unused-vars': [0, {
      'vars': 'local',
      'args': 'after-used'
    }], // 不能有声明后未被使用的变量或参数,
    'no-debugger': 0, // 不禁用debugger
    'no-var': 0, // 对var警告
    'semi': 0 // 不强制使用分号
  }
};
