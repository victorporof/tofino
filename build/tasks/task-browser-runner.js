// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import file from 'gulp-file';
import fs from 'fs-promise';
import colors from 'colors/safe';

import * as Paths from '../../src/shared/paths';

export const POLYFILL_FILENAME = 'browser-runner-polyfill.js';
export const MAIN = path.join(Paths.BROWSER_RUNNER_DST, POLYFILL_FILENAME);

gulp.task('browser-runner:babel', () =>
  gulp.src(`${Paths.BROWSER_RUNNER_SRC}/**/*.@(js|jsx)`)
    .pipe(changed(Paths.BROWSER_RUNNER_DST, { extension: '.js' }))
    .pipe(debug({ title: `Running ${colors.cyan('babel')}` }))
    .pipe(sourcemaps.init())
    .pipe(babel(fs.readJsonSync('.babelrc')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.BROWSER_RUNNER_DST)));

gulp.task('browser-runner:polyfill', () => {
  const contents = `
    import 'babel-polyfill';
    import './${Paths.BROWSER_RUNNER_ENTRY_FILENAME}';
  `;
  return file(POLYFILL_FILENAME, contents, { src: true })
    .pipe(debug({ title: 'Creating' }))
    .pipe(sourcemaps.init())
    .pipe(babel(fs.readJsonSync('.babelrc')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.BROWSER_RUNNER_DST));
});

gulp.task('browser-runner:build', gulp.series(
  'browser-runner:babel',
  'browser-runner:polyfill',
));
