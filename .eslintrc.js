module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "semi": true,
        "trailingComma": "none",
        "unexpected-solidus-in-tag": false
      }
    ]
  },

  parserOptions: {
    parser: "babel-eslint"
  },

  extends: ["plugin:vue/essential", "@vue/prettier"]
};
