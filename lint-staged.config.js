export default {
  'src/**/*.{js,ts}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{html,css,json,md}': [
    'prettier --write'
  ]
};