// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import stylelint from 'gulp-stylelint';
import fs from 'fs-promise';
import yargs from 'yargs';
import colors from 'colors/safe';

import * as Paths from '../../src/shared/paths';

gulp.task('eslint', () => {
  if (yargs.argv.unit) {
    return Promise.resolve();
  }
  const ignorePath = path.join(Paths.ROOT_DIR, '.eslintignore');
  const ignoreGlobs = fs.readFileSync(ignorePath, { encoding: 'utf8' });
  const glob = [
    `${Paths.ROOT_DIR}/**/*.@(js|jsx)`,
    ...ignoreGlobs.trim().split('\n').map(i => `!${i}`),
  ];
  return gulp.src(glob)
    .pipe(debug({ title: `Running ${colors.cyan(`eslint${yargs.argv.fix ? ' --fix' : ''}`)}:` }))
    .pipe(eslint({ fix: yargs.argv.fix }))
    .pipe(eslint.format())
    .pipe(gulpif(f => f.eslint != null && f.eslint.fixed, gulp.dest(Paths.ROOT_DIR)))
    .pipe(eslint.failAfterError());
});

gulp.task('stylelint', () => {
  if (yargs.argv.unit) {
    return Promise.resolve();
  }
  const glob = `${Paths.SRC_DIR}/**/*.css`;
  return gulp.src(glob)
    .pipe(debug({ title: `Running ${colors.cyan('stylelint')}:` }))
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true,
      }],
    }));
});

gulp.task('mocha', () => {
  const glob = yargs.argv.unit || `${Paths.SRC_DIR}/**/test/**/*.@(js|jsx)`;
  return gulp.src(glob)
    .pipe(debug({ title: `Running ${colors.cyan('mocha')}:` }))
    .pipe(mocha({
      compilers: 'js:babel-register',
    }));
});

gulp.task('test', gulp.series(
  'mocha',
  'stylelint',
  'eslint',
));
