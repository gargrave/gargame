const baseConfig = require('./webpack.config')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devServer: {
    port: 3000,
  },
}
