// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import yargs from 'yargs';

export const ROOT_DIR = path.resolve('.');
export const SRC_DIR = path.join(ROOT_DIR, 'src');
export const LIB_DIR = path.join(ROOT_DIR, 'lib');
export const BUILD_SCRIPTS_DIR = path.join(ROOT_DIR, 'build');

export const BUILD_TARGET_DIR = path.join(LIB_DIR, yargs.argv.objDirName || 'obj');

export const BROWSER_SHARED_DIRNAME = 'shared';
export const BROWSER_SHARED_SRC = path.join(SRC_DIR, BROWSER_SHARED_DIRNAME);
export const BROWSER_SHARED_DST = path.join(BUILD_TARGET_DIR, BROWSER_SHARED_DIRNAME);

export const BROWSER_FRONTEND_DIRNAME = 'browser-frontend';
export const BROWSER_FRONTEND_SRC = path.join(SRC_DIR, BROWSER_FRONTEND_DIRNAME);
export const BROWSER_FRONTEND_DST = path.join(BUILD_TARGET_DIR, BROWSER_FRONTEND_DIRNAME);
export const BROWSER_FRONTEND_ENTRY_FILENAME = 'index.jsx';
export const BROWSER_FRONTEND_BUNDLED_FILENAME = 'index.js';

export const BROWSER_RUNNER_DIRNAME = 'browser-runner';
export const BROWSER_RUNNER_SRC = path.join(SRC_DIR, BROWSER_RUNNER_DIRNAME);
export const BROWSER_RUNNER_DST = path.join(BUILD_TARGET_DIR, BROWSER_RUNNER_DIRNAME);
export const BROWSER_RUNNER_ENTRY_FILENAME = 'index.js';

export const BROWSER_SERVER_DIRNAME = 'browser-server';
export const BROWSER_SERVER_SRC = path.join(SRC_DIR, BROWSER_SERVER_DIRNAME);
export const BROWSER_SERVER_DST = path.join(BUILD_TARGET_DIR, BROWSER_SERVER_DIRNAME);
export const BROWSER_SERVER_ENTRY_FILENAME = 'index.js';
