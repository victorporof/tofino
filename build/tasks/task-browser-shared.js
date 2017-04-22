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

gulp.task('browser-shared:babel', () =>
  gulp.src(`${Paths.BROWSER_SHARED_SRC}/**/*.@(js|jsx)`)
    .pipe(changed(Paths.BROWSER_SHARED_DST, { extension: '.js' }))
    .pipe(debug({ title: `Running ${colors.cyan('babel')}` }))
    .pipe(sourcemaps.init())
    .pipe(babel(fs.readJsonSync('.babelrc')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.BROWSER_SHARED_DST)));

gulp.task('browser-shared:copy-icons', () =>
  gulp.src(`${Paths.BROWSER_SHARED_SRC}/branding/**/*`)
    .pipe(changed(`${Paths.BROWSER_SHARED_DST}/branding`))
    .pipe(debug({ title: `Running ${colors.cyan('cp')}` }))
    .pipe(gulp.dest(`${Paths.BROWSER_SHARED_DST}/branding`)));

gulp.task('browser-shared:build', gulp.series(
  'browser-shared:babel',
  'browser-shared:copy-icons',
));
