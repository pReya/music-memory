module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react-hooks", "prettier"],
  ignorePatterns: ['dist/', 'node_modules/'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true,
      "modules": true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/prop-types": 0
  }
};