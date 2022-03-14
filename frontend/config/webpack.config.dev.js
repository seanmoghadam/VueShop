const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    // was added because of vue runtime dependency
    alias: {
      vue: '@vue/runtime-dom',
    },
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
            plugins: ['@babel/plugin-proposal-optional-chaining'],
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    open: true,
    port: 4000,
  },
};
