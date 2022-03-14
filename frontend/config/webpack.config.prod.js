const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      publicPath: '/',
      filename: 'index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    open: true,
    port: 5000,
  },
};
