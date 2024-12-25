import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  // collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  // coverageDirectory: 'coverage',
  // coverageProvider: 'v8',
};

export default config;
