const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_ROOT = '../'

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      title: 'Gengine',
    }),
  ],
}
