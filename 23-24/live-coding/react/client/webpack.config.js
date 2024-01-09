const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const isProd = !!env && !!env.production

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      spa: path.join(__dirname, 'index.tsx')
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    devtool: isProd ? undefined : 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: '/node_modules/'
        },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]' // Keep original filename instead of a unique one
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, // Extracts CSS into a separate file
            'css-loader', // Translates CSS into CommonJS
            'sass-loader' // Compiles Sass to CSS
          ]
        }
      ]
    },
    watchOptions: {
      ignored: [path.resolve(__dirname, 'node_modules')]
    },
    output: {
      filename: isProd ? '[name].bundle.[contenthash].min.js' : '[name].bundle.js',
      chunkFilename: isProd ? '[name].chunk.[contenthash].min.js' : '[name].chunk.js',
      path: path.resolve(__dirname, '../server'),
      publicPath: '/',
      libraryTarget: 'var',
      library: 'spa'
    },
    optimization: {
      minimize: isProd,
      minimizer: [],
      usedExports: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser'
      })
    ]
  }
}
