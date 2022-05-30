module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "quote-props": 0,
    "quotes": 1,
    "semi": [1, "never"],
    "indent": [2, 4],
    "standard/no-callback-literal": 0
  }
}
