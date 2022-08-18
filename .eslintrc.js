module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-await-in-loop': 0,
    'default-param-last': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
  },
};
