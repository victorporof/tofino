// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import fs from 'fs-promise';
import colors from 'colour';

import * as Paths from '../../src/shared/paths';

gulp.task('browser-server:babel', () =>
  gulp.src(`${Paths.BROWSER_SERVER_SRC}/**/*.@(js|jsx)`)
    .pipe(changed(Paths.BROWSER_SERVER_DST, { extension: '.js' }))
    .pipe(debug({ title: `Running ${colors.cyan('babel')}` }))
    .pipe(sourcemaps.init())
    .pipe(babel(fs.readJsonSync('.babelrc')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.BROWSER_SERVER_DST)));

gulp.task('browser-server:build', gulp.series(
  'browser-server:babel',
));
