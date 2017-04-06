// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import expect from 'expect';
import globby from 'globby';

import * as Paths from '../../../shared/paths';
import { regexFiles } from './util/regex';

describe('hardcoded paths', () => {
  it('should be avoided in favor of the shared `paths` module', async () => {
    const globs = [
      `${Paths.ROOT_DIR}/**/*.@(js|jsx)`,
      `!**/${Paths.LIB_DIR}/**`,
      `!**/${Paths.DIST_DIR}/**`,
      '!**/node_modules/**',
      // Exclude the paths module.
      `!${path.join(Paths.SRC_DIR, 'shared', 'paths.js')}`,
      `!${path.join(Paths.SRC_DIR, 'shared', 'build-info.js')}`,
      // Exclude this file.
      `!${__filename}`,
    ];

    const sources = await globby(globs);
    const hardcoded = await regexFiles(sources, /(__dirname)/g, /(__filename)/g);

    expect(hardcoded).toEqual([]);
  });
});
