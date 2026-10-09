import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'server/dist/**', 'node_modules/**'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
];
