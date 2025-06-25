import js from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URLSearchParams: 'readonly',
        URL: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        HTMLElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLButtonElement: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        // React globals
        React: 'readonly',
        JSX: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Disable problematic rules that cause build issues
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-undef': 'error'
    }
  }
];

export default eslintConfig;