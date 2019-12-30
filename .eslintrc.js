module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
  ],
  rules: {
    "indent": ["error", 4],
    "semi": ["error", "never", { "beforeStatementContinuationChars": "never"}],
    "delimiter": ["error", "comma"],
  }
}