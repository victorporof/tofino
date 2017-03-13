// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';
import cp from 'child_process';

import yargs from 'yargs';
import gulp from 'gulp';
import portastic from 'portastic';
import colors from 'colors/safe';

import logger from '../logger';

import { MAIN as browserRunnerMain } from '../tasks/task-browser-runner';
import { MAIN as browserServerMain } from '../tasks/task-browser-server';

const PORT_RANGE = {
  min: 9000,
  max: 9999,
};

const spawn = (command, main, ...args) => new Promise((resolve, reject) => {
  logger.log('Spawning',
    colors.cyan(command),
    colors.blue(path.relative('.', main)),
    colors.yellow(args.join(' ')));

  const child = cp.spawn(command, [main, ...args], { stdio: 'inherit' });
  child.on('error', reject);
  child.on('exit', resolve);
});

gulp.task('start', async () => {
  const ports = await portastic.find(PORT_RANGE);
  if (ports.length === 0) {
    throw new Error('Couldn\'t find any open ports.');
  }

  const args = [
    '--obj-dir-name', yargs.argv.objDirName,
    '--version', 'v1',
    '--hostname', 'localhost',
    '--port', ports[0],
  ];

  return Promise.all([
    spawn('electron', browserRunnerMain, ...args),
    spawn('node', browserServerMain, ...args),
  ]);
});
