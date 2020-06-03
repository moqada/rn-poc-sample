module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    '@typescript-eslint',
    'jest',
    'eslint-plugin-import',
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {
    // @typescript-eslintでエラーを検出したい為、eslint側のno-unused-varsはoffに設定
    'no-unused-vars': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'table'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@{components,containers,domain,config,useCases}/**',
            group: 'internal',
          },
          {
            pattern: '@styles',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {order: 'asc'},
        'newlines-between': 'always',
      },
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    // TypeScriptでpropsの型をチェックするので、prop-typesはoffに設定
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
