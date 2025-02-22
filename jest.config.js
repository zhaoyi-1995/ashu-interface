module.exports = {
  // 测试的文件
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  // 注入全局变量
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  rootDir: '',
  // 转换使用的脚本
  transform: {
    '.(ts|tsx)': '@swc/jest',
  },
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  watchAll: false,
  collectCoverage: true,
  // 生成的文件路径
  coverageDirectory: './docs/jest-coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};
