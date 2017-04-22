// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import gulp from 'gulp';
import debug from 'gulp-debug';
import file from 'gulp-file';
import zip from 'gulp-zip';
import globby from 'globby';
import packager from 'electron-packager';
import yargs from 'yargs';
import fs from 'fs-promise';
import streamToPromise from 'stream-to-promise';
import pick from 'lodash/pick';
import git from 'git-rev-sync';
import df from 'dateformat';
import colors from 'colour';

import logger from '../logger';

import { spawn } from '../../src/shared/util/spawn';
import * as Paths from '../../src/shared/paths';
import * as BuildInfo from '../../src/shared/build-info';
import Manifest from '../../package.json';

gulp.task('package:write-build-type', () =>
  file(BuildInfo.BUILD_TYPE_FILENAME, '"packaged"', { src: true })
    .pipe(debug({ title: 'Creating' }))
    .pipe(gulp.dest(Paths.RESOURCES_DIR)));

gulp.task('package:write-manifest', () => {
  const dst = path.join(Paths.RESOURCES_DIR, 'package.json');
  const config = pick(Manifest, ['name', 'version', 'dependencies']);
  config.main = path.relative(Paths.RESOURCES_DIR, Paths.ELECTRON_RUNNER_DST_MAIN);
  return fs.writeJson(dst, config);
});

gulp.task('package:install-modules', () => {
  const cwd = Paths.RESOURCES_DIR;
  const npm = process.platform === 'win32'
    ? 'npm.cmd'
    : 'npm';
  return spawn(npm, 'install', ['--production'], { logger }, { cwd });
});

gulp.task('package:copy-node', () => {
  const src = process.execPath;
  const dst = path.join(Paths.RESOURCES_DIR, path.basename(src));
  return fs.copy(src, dst);
});

gulp.task('package:bundle-electron-app', (cb) => {
  packager({
    platform: yargs.argv.platform || process.platform,
    icon: path.join(Paths.BROWSER_SHARED_SRC, 'branding', 'app-icon'),
    dir: Paths.RESOURCES_DIR,
    out: path.join(Paths.DIST_DIR, 'binaries'),
    overwrite: true,
  }, cb);
});

gulp.task('package:zip', async () => {
  const src = `${Paths.DIST_DIR}/binaries/*`;
  const dst = Paths.DIST_DIR;
  const getArchiveName = bundleBasename => `${bundleBasename}-${df(Date.now(), 'yymmdd')}-${git.short()}.zip`;

  return Promise.all((await globby(src)).map((folder) => {
    logger.log(`Running ${colors.command('zip')} ${colors.path(folder)}`);

    return streamToPromise(
      gulp.src(`${folder}/**/*`)
        .pipe(zip(getArchiveName(path.basename(folder))))
        .pipe(gulp.dest(dst)));
  }));
});

gulp.task('package', gulp.series(
  'clean',
  'build',
  'package:write-build-type',
  'package:write-manifest',
  'package:install-modules',
  'package:copy-node',
  'package:bundle-electron-app',
  'package:zip',
));
