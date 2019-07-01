module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@gargrave/ggdash(.*)$': '<rootDir>/src/ggdash$1',
  },
  transform: {
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest',
  },
}
