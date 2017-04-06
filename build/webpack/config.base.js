// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin';

import devConfig from './config.base.snippets.dev';
import prodConfig from './config.base.snippets.prod';

export default {
  entry: [
    'babel-polyfill',
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]-[hash:base64:5]',
        },
      }],
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new InlineEnviromentVariablesPlugin([
      'NODE_ENV',
      'LOGGING',
    ], {
      warnings: false,
    }),
  ],
};

export const makeDevConfig = baseConfig => ({
  ...devConfig,
  ...baseConfig,
  output: {
    ...devConfig.output || {},
    ...baseConfig.output || {},
  },
  plugins: [
    ...devConfig.plugins || [],
    ...baseConfig.plugins || [],
  ],
});

export const makeProdConfig = baseConfig => ({
  ...prodConfig,
  ...baseConfig,
  output: {
    ...prodConfig.output || {},
    ...baseConfig.output || {},
  },
  plugins: [
    ...prodConfig.plugins || [],
    ...baseConfig.plugins || [],
  ],
});
