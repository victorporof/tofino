// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import webpack from 'webpack';

import baseConfig from './config.base';

export default {
  ...baseConfig,
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
