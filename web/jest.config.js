module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'vuetify/lib(.*)': '<rootDir>/node_modules/vuetify',
  },
};
