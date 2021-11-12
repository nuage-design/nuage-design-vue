module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "@vue/typescript",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
