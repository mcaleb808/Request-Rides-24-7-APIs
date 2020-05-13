module.exports = {
  displayName: 'Taxi-24-APIs',
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'api/**/*.js',
    '!**/db/**/**',
    '!**/config/**/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/jest.config.js'
  ]
};
