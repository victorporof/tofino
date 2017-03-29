// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import * as Paths from '../../src/shared/paths';
import defaultConfig from './config.base';

export const ENTRY_PATH = path.join(
  Paths.BROWSER_FRONTEND_SRC,
  Paths.BROWSER_FRONTEND_ENTRY_FILENAME);

export default {
  ...defaultConfig,
  entry: [
    ...defaultConfig.entry,
    'font-awesome-webpack',
    ENTRY_PATH,
  ],
  output: {
    ...defaultConfig.output,
    filename: Paths.BROWSER_FRONTEND_BUNDLED_FILENAME,
  },
};
