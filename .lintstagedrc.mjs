export default {
  './src/**/*.css': ['stylelint --fix', 'prettier --write'],
  './src/**/*.{js,jsx,ts,tsx}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  './src/**/*.{json,html,md}': 'prettier --write',
};
