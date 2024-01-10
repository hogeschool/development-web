const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
  const isProd = !!env && !!env.production

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      spa: path.join(__dirname, 'index.tsx'),
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        process: require.resolve("process/browser"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert"),
        _stream_transform: require.resolve("readable-stream/transform"),
        "crypto": require.resolve("crypto-browserify")
      },
    },
    devtool: isProd ? undefined : 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{
            loader: 'babel-loader',
          }],
          exclude: '/node_modules/'
        },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ]
    },
    watchOptions: {
      ignored: [path.resolve(__dirname, 'node_modules')],
    },
    output: {
      filename: isProd ? '[name].bundle.[contenthash].min.js' : '[name].bundle.js',
      chunkFilename: isProd ? '[name].chunk.[contenthash].min.js' : '[name].chunk.js',
      path: path.resolve(__dirname, '../server/wwwroot'),
      publicPath: '/',
      libraryTarget: 'var',
      library: 'spa',
    },
    optimization: {
      minimize: isProd,
      minimizer: [],
      usedExports: true,
      // splitChunks: {
      //   chunks: 'all',
      //   // minSize: 0,
      //   cacheGroups: {
      //     vendor: {
      //       name: 'Vendors', // part of the bundle name and can be used in chunks array of HtmlWebpackPlugin
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10,
      //       reuseExistingChunk: true,
      //       chunks: 'initial', // "all",
      //     },
      //   },
      // },      
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      }),
      // ...(isProd ? [] : new CleanWebpackPlugin({
      //   cleanOnceBeforeBuildPatterns: ["*.chunk.*", "spa.*"]
      // })),
    ]
  }
}