// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import yargs from 'yargs';
import { IS_LOCAL_BUILD, IS_PACKAGED_BUILD, NOT_RUNNING_IN_BUILD } from './build-info';

/**
 * Top-level root directory, where all paths originate from.
 * Differs based on whether this is a local or packaged build, running tests etc.
 */
export const ROOT_DIR = path.resolve((() => {
  if (IS_LOCAL_BUILD) {
    return path.join(__dirname, '..', '..', '..');
  }
  if (IS_PACKAGED_BUILD) {
    return path.join(__dirname, '..');
  }
  if (NOT_RUNNING_IN_BUILD) { // e.g. gulp tasks, mocha tests etc.
    return path.join(__dirname, '..', '..');
  }
  throw new Error('Unknown runtime.');
})());

/**
 * Main high-level source code directories.
 * Only available when running a local build or when running tests.
 */
export const SRC_DIR = IS_PACKAGED_BUILD ? undefined : path.join(ROOT_DIR, 'src');
export const LIB_DIR = IS_PACKAGED_BUILD ? undefined : path.join(ROOT_DIR, 'lib');
export const DIST_DIR = IS_PACKAGED_BUILD ? undefined : path.join(ROOT_DIR, 'dist');
export const BUILD_SCRIPTS_DIR = IS_PACKAGED_BUILD ? undefined : path.join(ROOT_DIR, 'build');

/**
 * Build destination ("resources") directory name.
 * Differs based on whether this is a local or packaged build, running tests etc.
 */
export const OBJ_DIR_NAME = (() => {
  if (IS_LOCAL_BUILD) {
    return path.basename(path.join(__dirname, '..'));
  }
  if (IS_PACKAGED_BUILD) {
    return '.';
  }
  if (NOT_RUNNING_IN_BUILD) { // e.g. gulp tasks, mocha tests etc.
    return yargs.argv.objDirName || 'obj';
  }
  throw new Error('Unknown runtime.');
})();

/**
 * Build destination ("resources") directory path.
 * Differs only based on whether this is a local or packaged build.
 */
export const RESOURCES_DIR = path.join(IS_PACKAGED_BUILD ? ROOT_DIR : LIB_DIR, OBJ_DIR_NAME);

/**
 * Shared code paths.
 */
export const BROWSER_SHARED_DIRNAME = 'shared';
export const BROWSER_SHARED_SRC = IS_PACKAGED_BUILD ? undefined : path.join(SRC_DIR, BROWSER_SHARED_DIRNAME);
export const BROWSER_SHARED_DST = path.join(RESOURCES_DIR, BROWSER_SHARED_DIRNAME);

/**
 * Browser frontend paths.
 */
export const BROWSER_FRONTEND_DIRNAME = 'browser-frontend';
export const BROWSER_FRONTEND_SRC = IS_PACKAGED_BUILD ? undefined : path.join(SRC_DIR, BROWSER_FRONTEND_DIRNAME);
export const BROWSER_FRONTEND_DST = path.join(RESOURCES_DIR, BROWSER_FRONTEND_DIRNAME);

export const BROWSER_FRONTEND_ENTRY_FILENAME = 'index.js';
export const BROWSER_FRONTEND_BUNDLED_FILENAME = 'index.js';
export const BROWSER_FRONTEND_DST_MAIN = path.join(BROWSER_FRONTEND_DST, BROWSER_FRONTEND_BUNDLED_FILENAME);

/**
 * Common browser runner paths.
 */
export const BROWSER_RUNNER_DIRNAME = 'browser-runner';
export const BROWSER_RUNNER_SRC = IS_PACKAGED_BUILD ? undefined : path.join(SRC_DIR, BROWSER_RUNNER_DIRNAME);
export const BROWSER_RUNNER_DST = path.join(RESOURCES_DIR, BROWSER_RUNNER_DIRNAME);

/**
 * Electron runner.
 */
export const ELECTRON_PLATFORM_DIRNAME = 'platform-electron';
export const ELECTRON_RUNNER_ENTRY_FILENAME = path.join(ELECTRON_PLATFORM_DIRNAME, 'index.js');
export const ELECTRON_RUNNER_DST_MAIN = path.join(BROWSER_RUNNER_DST, ELECTRON_RUNNER_ENTRY_FILENAME);

/**
 * Dummy (headless) runner.
 */
export const DUMMY_PLATFORM_DIRNAME = 'platform-dummy';
export const DUMMY_RUNNER_ENTRY_FILENAME = path.join(DUMMY_PLATFORM_DIRNAME, 'index.js');
export const DUMMY_RUNNER_DST_MAIN = path.join(BROWSER_RUNNER_DST, DUMMY_RUNNER_ENTRY_FILENAME);

/**
 * Qbrt (gecko) runner.
 */
export const QBRT_PLATFORM_DIRNAME = 'platform-qbrt';
export const QBRT_RUNNER_ENTRY_FILENAME = path.join(QBRT_PLATFORM_DIRNAME, 'index.js');
export const QBRT_RUNNER_DST_MAIN = path.join(BROWSER_RUNNER_DST, QBRT_RUNNER_ENTRY_FILENAME);

export const QBRT_SHELL_DIRNAME = path.join(QBRT_PLATFORM_DIRNAME, 'shell');
export const QBRT_RUNNER_SHELL_SRC = IS_PACKAGED_BUILD ? undefined : path.join(BROWSER_RUNNER_SRC, QBRT_SHELL_DIRNAME);
export const QBRT_RUNNER_SHELL_DST = path.join(BROWSER_RUNNER_DST, QBRT_SHELL_DIRNAME);

/**
 * Browser server paths.
 */
export const BROWSER_SERVER_DIRNAME = 'browser-server';
export const BROWSER_SERVER_SRC = IS_PACKAGED_BUILD ? undefined : path.join(SRC_DIR, BROWSER_SERVER_DIRNAME);
export const BROWSER_SERVER_DST = path.join(RESOURCES_DIR, BROWSER_SERVER_DIRNAME);

export const BROWSER_SERVER_ENTRY_FILENAME = 'index.js';
export const BROWSER_SERVER_DST_MAIN = path.join(BROWSER_SERVER_DST, BROWSER_SERVER_ENTRY_FILENAME);
