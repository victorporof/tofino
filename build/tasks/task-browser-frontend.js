// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import webpack from 'webpack';
import colors from 'colors/safe';

import logger from '../logger';

import * as Paths from '../../src/shared/paths';
import config from '../webpack/config.browser-frontend';
import { makeDevConfig, makeProdConfig } from '../webpack/config.base';

const WEBPACK_STATS_OPTIONS = {
  colors: true,
  warnings: false,
};

gulp.task('browser-frontend:copy-html', () =>
  gulp.src(`${Paths.BROWSER_FRONTEND_SRC}/**/*.html`)
    .pipe(changed(Paths.BROWSER_FRONTEND_DST))
    .pipe(debug({ title: `Running ${colors.cyan('cp')}` }))
    .pipe(gulp.dest(Paths.BROWSER_FRONTEND_DST)),
);

gulp.task('browser-frontend:webpack', () => new Promise((resolve, reject) => {
  const currentConfig = process.env.NODE_ENV === 'production'
    ? makeProdConfig(config)
    : makeDevConfig(config);

  webpack(currentConfig, (err, stats) => {
    if (err) { reject(err); return; }
    if (stats) { logger.log(stats.toString(WEBPACK_STATS_OPTIONS)); }
    resolve();
  });
}));

gulp.task('browser-frontend:build', gulp.series(
  'browser-frontend:copy-html',
  'browser-frontend:webpack',
));
