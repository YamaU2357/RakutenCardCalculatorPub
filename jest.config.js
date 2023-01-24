module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "moduleDirectories": ['node_modules', 'src'],
  "moduleNameMapper": {
    '#node-web-compat': "./node-web-compat-node.js",
  },
  "testEnvironment": "jest-environment-jsdom",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.ts"]
}