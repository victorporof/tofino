// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import * as Paths from '../../src/shared/paths';
import defaultConfig from './config.base';

export default {
  ...defaultConfig,
  context: Paths.BROWSER_FRONTEND_SRC,
  entry: [
    'font-awesome-webpack',
    `./${Paths.BROWSER_FRONTEND_ENTRY_FILENAME}`,
  ],
  output: {
    ...defaultConfig.output,
    path: Paths.BROWSER_FRONTEND_DST,
    filename: Paths.BROWSER_FRONTEND_BUNDLED_FILENAME,
  },
};
