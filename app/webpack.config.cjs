const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const Webpack = require('webpack')
const gitRevisionPlugin = new GitRevisionPlugin()
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    style: ['./lib/style.css'],
    app: ['./lib/app.js'],
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader' },
        ],
      },
      { test: /\.html$/, use: 'raw-loader' },
    ],
  },
  plugins: [
    gitRevisionPlugin,
    new Webpack.DefinePlugin({
      SECVISOGRAM_VERSION: JSON.stringify(gitRevisionPlugin.version()),
    }),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      chunks: ['style', 'app'],
      template: './lib/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'vendor/first',
          to: 'vendor/first',
        },
        {
          from: '../docs/user',
          to: 'docs/user',
        },
        {
          from: 'locales',
          to: 'locales',
        },
      ],
    }),
    ...(process.env.NODE_ENV === 'production'
      ? []
      : [
          new HTMLWebpackPlugin({
            chunks: ['style'],
            template: './lib/index.html',
            filename: 'cypress/index.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['style', 'view-tests'],
            filename: 'view-tests.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['style', 'view-tests-canvas'],
            filename: 'view-tests-canvas.html',
            template: './lib/index.html',
          }),
        ]),
    new MonacoWebpackPlugin({
      languages: ['json'],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.join(__dirname, 'public/.well-known/appspecific'),
      },
    ],
    proxy: [
      { context: ['/api'], target: 'http://localhost:4180' },
      { context: ['/oauth2'], target: 'http://localhost:4180' },
    ],
  },
}
