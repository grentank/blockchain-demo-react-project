module.exports = {
  env: {
    browser: true,
    es2021: true,
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
    'react/jsx-filename-extension': 0,
    'no-await-in-loop': 0,
    'default-param-last': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'spaced-comment': 0,
  },
};
