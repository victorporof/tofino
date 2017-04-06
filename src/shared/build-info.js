// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import fs from 'fs-promise';

export const BUILD_TYPE_FILENAME = 'build-type';
export const BUILD_TYPE_FILEPATH = path.join(__dirname, '..', BUILD_TYPE_FILENAME);

const BUILD_TYPE =
  fs.existsSync(BUILD_TYPE_FILEPATH) &&
  fs.readJsonSync(BUILD_TYPE_FILEPATH);

export const IS_LOCAL_BUILD = BUILD_TYPE === 'local';
export const IS_PACKAGED_BUILD = BUILD_TYPE === 'packaged';
export const NOT_RUNNING_IN_BUILD = !IS_LOCAL_BUILD && !IS_PACKAGED_BUILD;
