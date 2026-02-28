const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const remoteEntryUrl = process.env.REMOTE_URL || 'https://kumark117.github.io/signal-transformer-microfrontend/remoteEntry.js';

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        SignalTransformer: `SignalTransformer@${remoteEntryUrl}`,
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
