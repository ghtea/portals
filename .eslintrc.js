module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
  ],
  plugins: ["import"],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // formatting
    // pay attention to use same rules with prettier
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    indent: ['error', 2],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    // import
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
    // react
    'react-hooks/exhaustive-deps': 'error',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // a11y
    'jsx-a11y/label-has-associated-control': ['error', { depth: 2 }],
  },
  parserOptions: {
    project: './tsconfig.json'
  }
};
