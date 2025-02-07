module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    "jest/globals": true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "prefer-destructuring": 0,
    "no-param-reassign": ["error", { "props": false }],
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
};


