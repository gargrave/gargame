module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@gargrave/growbag(.*)$': '<rootDir>/src/_libs/growbag$1',
  },
  transform: {
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest',
  },
}
