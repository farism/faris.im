import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import history from 'connect-history-api-fallback'
import convert from 'koa-connect'

export default {
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'assets'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules=true&localIdentName=[local]-[hash:base64:5]',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'faris.im',
    }),
  ],
  serve: {
    add: (app, middleware, options) => {
      app.use(convert(history({})))
    },
  },
}
