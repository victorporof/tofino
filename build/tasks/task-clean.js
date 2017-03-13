// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import del from 'del';
import colors from 'colors/safe';

import logger from '../logger';

import * as Paths from '../../src/shared/paths';

gulp.task('clean', () => {
  logger.log(`Running ${colors.cyan('rm')} ${colors.blue(Paths.LIB_DIR)}`);
  return del([Paths.LIB_DIR]);
});
