// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import webpack from 'webpack';

import baseConfig from './config.base';

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    pathinfo: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.NamedModulesPlugin(),
  ],
};
