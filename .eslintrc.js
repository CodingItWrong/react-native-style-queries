module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['jest'],
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    quotes: ['error', 'single', {avoidEscape: true}], // single quote unless using interpolation
  },
};
