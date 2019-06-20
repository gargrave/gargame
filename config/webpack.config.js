const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
  //
  resolve: {
    extensions: ['.js', '.ts'],
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
