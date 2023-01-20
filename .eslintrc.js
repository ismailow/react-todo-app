module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks'],
  rules: {
    'no-plusplus': 'off',
    'react/state-in-constructor': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-max-props-per-line': [1, { "when": "multiline" }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'class-methods-use-this': 'off',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/order': [2, {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    }]
  },
  settings: {
    version: 'detect',
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};