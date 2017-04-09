// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import webpack from 'webpack';

import * as Paths from '../../src/shared/paths';
import { WEBPACK_DEV_SERVER_HOST, WEBPACK_DEV_SERVER_PORT } from '../../src/shared/endpoints';
import baseDevConfig from './config.default-dev';

export default {
  ...baseDevConfig,
  context: Paths.BROWSER_FRONTEND_SRC,
  entry: [
    ...baseDevConfig.entry,
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`,
    'webpack/hot/only-dev-server',
    'font-awesome-webpack',
    `./${Paths.BROWSER_FRONTEND_ENTRY_FILENAME}`,
  ],
  output: {
    ...baseDevConfig.output,
    path: Paths.BROWSER_FRONTEND_DST,
    filename: Paths.BROWSER_FRONTEND_BUNDLED_FILENAME,
    publicPath: '/v1/chrome/hot-module-reload/',
  },
  plugins: [
    ...baseDevConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
