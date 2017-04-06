// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import colors from 'colors/safe';

import logger from '../logger';

import * as Paths from '../../src/shared/paths';
import config, { ENTRY_PATH } from '../webpack/config.browser-frontend';
import { makeDevConfig, makeProdConfig } from '../webpack/config.base';

gulp.task('browser-frontend:copy-html', () =>
  gulp.src(`${Paths.BROWSER_FRONTEND_SRC}/**/*.html`)
    .pipe(changed(Paths.BROWSER_FRONTEND_DST))
    .pipe(debug({ title: `Running ${colors.cyan('cp')}` }))
    .pipe(gulp.dest(Paths.BROWSER_FRONTEND_DST)),
);

gulp.task('browser-frontend:webpack', () => {
  const currentConfig = process.env.NODE_ENV === 'production'
    ? makeProdConfig(config)
    : makeDevConfig(config);

  return gulp.src(ENTRY_PATH)
    .pipe(debug({ title: `Running ${colors.cyan('webpack')}` }))
    .pipe(webpackStream(currentConfig, webpack, (err, stats) => {
      if (err) logger.log(err);
      if (stats) logger.log(stats.toString({ colors: true, warnings: false, chunks: false }));
    }))
    .pipe(gulp.dest(Paths.BROWSER_FRONTEND_DST));
});

gulp.task('browser-frontend:build', gulp.series(
  'browser-frontend:copy-html',
  'browser-frontend:webpack',
));
