import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // interface запрещён — только type
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // вертикальный ритм: пустая строка после if (в т.ч. guard) и перед return
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
  {
    // определения типов — только в types.ts
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/types.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSTypeAliasDeclaration',
          message: 'Определения типов выносятся в отдельный файл types.ts',
        },
        {
          selector: 'TSInterfaceDeclaration',
          message: 'interface запрещён; определения типов — в types.ts',
        },
      ],
    },
  },
])
