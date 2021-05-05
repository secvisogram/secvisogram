const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const Webpack = require('webpack')
const gitRevisionPlugin = new GitRevisionPlugin()

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    secvisogram: './lib/SecvisogramPage.js',
    ...(process.env.NODE_ENV === 'production'
      ? {}
      : {
          'view-tests': './viewTests/frame.js',
          'view-tests-canvas': './viewTests/canvas.js',
          tests: [
            'mocha/mocha.css',
            'mocha/mocha.js',
            './tests/mochaSetup.js',
            './tests/index.js',
            './tests/mochaRun.js',
          ],
        }),
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
      chunks: ['secvisogram'],
      template: './lib/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'vendor/ace-builds/src-min-noconflict',
          to: 'vendor/ace',
        },
        {
          from: 'vendor/first',
          to: 'vendor/first',
        },
      ],
    }),
    ...(process.env.NODE_ENV === 'production'
      ? []
      : [
          new HTMLWebpackPlugin({
            chunks: ['view-tests'],
            filename: 'view-tests.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['view-tests-canvas'],
            filename: 'view-tests-canvas.html',
            template: './lib/index.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['tests'],
            filename: 'tests.html',
            template: './tests/index.html',
          }),
        ]),
  ],
}
