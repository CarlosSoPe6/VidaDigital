module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    jest: true,
  },
  plugins: ["jest"],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  ignorePatterns: ["node_modules/**/*.js"],
  rules: {
  },
  overrides: [
    {
      files: ['**/**/*.js', '*.js'],
    },
  ],
};
