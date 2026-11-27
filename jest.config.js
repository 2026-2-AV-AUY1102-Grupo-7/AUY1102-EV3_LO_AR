// @ts-check

/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  displayName: 'pkg-value-object',
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/src/models/**',
    '!**/src/constants/**',
    '!**/src/config/**',
    '!**/src/structures/**',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // @faker-js/faker v10 es solo ESM: se transforma con swc para que Jest (CommonJS) pueda cargarlo
  transformIgnorePatterns: ['/node_modules/(?!@faker-js/faker)'],
};

module.exports = jestConfig;
