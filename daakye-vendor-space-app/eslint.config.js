// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,

  {
    // Ignore build artifacts, Expo files, and native code directories.
    // This keeps linting fast as the project grows (these folders can be huge).
    // Husky + lint-staged runs ESLint on staged files; these ignores ensure
    // generated output doesn't slow the check or produce noisy errors.
    ignores: [
      "dist/*",
      "web-build/*",
      ".expo/*",
      "node_modules/*",
      "ios/*",
      "android/*",
    ],
  },
]);
