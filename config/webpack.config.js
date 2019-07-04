const path = require('path')

const APP_ROOT = '../'

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'gargame.js',
    library: 'gg',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
  },
  //
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@gargrave/ggdash': path.resolve(__dirname, APP_ROOT, 'src/ggdash/'),
    },
  },
  //
  module: {
    rules: [
      {
        test: /\.ts/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {},
        },
      },
    ],
  },
  //
  plugins: [],
}
