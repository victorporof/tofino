// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import * as Paths from '../../src/shared/paths';
import baseProdConfig from './config.default-prod';

export default {
  ...baseProdConfig,
  context: Paths.BROWSER_FRONTEND_SRC,
  entry: [
    ...baseProdConfig.entry,
    'font-awesome-webpack',
    `./${Paths.BROWSER_FRONTEND_ENTRY_FILENAME}`,
  ],
  output: {
    ...baseProdConfig.output,
    path: Paths.BROWSER_FRONTEND_DST,
    filename: Paths.BROWSER_FRONTEND_BUNDLED_FILENAME,
  },
};
