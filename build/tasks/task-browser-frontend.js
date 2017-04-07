// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import colors from 'colors/safe';

import * as Paths from '../../src/shared/paths';
import * as Endpoints from '../../src/shared/endpoints';
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

gulp.task('browser-frontend:webpack', (cb) => {
  const currentConfig = process.env.NODE_ENV === 'production'
    ? makeProdConfig(config)
    : makeDevConfig(config);

  const compiler = webpack(currentConfig);
  const server = new WebpackDevServer(compiler, {
    stats: WEBPACK_STATS_OPTIONS,
  });

  server.listen(
    Endpoints.WEBPACK_DEV_SERVER_PORT,
    Endpoints.WEBPACK_DEV_SERVER_HOST, cb);
});

gulp.task('browser-frontend:build', gulp.series(
  'browser-frontend:copy-html',
  'browser-frontend:webpack',
));
