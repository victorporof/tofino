// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import gulp from 'gulp';

gulp.task('build', gulp.series(
  'browser-shared:build',
  'browser-runner:build',
  'browser-server:build',
  'browser-frontend:build',
));

gulp.task('build+start', gulp.series(
  'build',
  'start',
));
