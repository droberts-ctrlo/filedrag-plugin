import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default [
  { files: ['./src/*.{js,mjs,cjs,ts}'] },
  { ignores: ['build.cjs', 'jest.config.js'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.jquery, ...globals.jest, ...globals.commonjs } } },
  {
    plugins: {
      '@stylistic': stylistic,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs['recommended-flat'],
  {
    rules: {
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-statements-per-line': 0,
    },
  },
];
