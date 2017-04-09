// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import path from 'path';

import expect from 'expect';
import globby from 'globby';
import fs from 'fs-promise';
import commentJson from 'comment-json';
import isBuiltinModule from 'is-builtin-module';
import intersection from 'lodash/intersection';
import flattenDeep from 'lodash/flattenDeep';
import * as NodeLibsBrowser from 'node-libs-browser';

import * as Paths from '../../../shared/paths';
import { regexFiles } from './util/regex';

import BaseWebpackConfig from '../../../../build/webpack/config.base';
import { dependencies, devDependencies } from '../../../../package.json';

describe('modules', () => {
  // We can afford being a little more relaxed with the regexes here
  // since we have very strict eslint rules about whitespace.
  const IMPORTS_REGEX = /import(?:.*?from)?\s+'(\w+[\w-./]*)'/g;
  const REQUIRES_REGEX = /require\('(\w+[\w-./]*)'\)/g;

  const packages = Object.keys(dependencies).sort();
  const devPackages = Object.keys(devDependencies).sort();
  const allPackages = [...packages, ...devPackages].sort();

  it('use the listed packages in package.json for all code', async () => {
    const globs = [
      `${Paths.ROOT_DIR}/**/*.@(js|jsx)`,
      `!**/${Paths.LIB_DIR}/**`,
      `!**/${Paths.DIST_DIR}/**`,
      '!**/node_modules/**',
    ];

    const unimported = [
      // Used for npm run scripts in the `package.json` config file.
      'cross-env',

      // Used for mocha test configuration in `build/tasks/task-test.js`.
      'babel-register',

      // Used for the `babel-plugin-transform-runtime` in `babelrc` config file.
      'babel-runtime',

      // Entry paths for `build/webpack/config.browser-frontend.js` config file.
      'font-awesome-webpack',

      // Peer dependencies for `font-awesome-webpack`.
      'font-awesome',
      'less',

      // Peer dependencies for `url-loader`.
      'file-loader',

      // Directly spawned
      'qbrt',
    ];

    const babelrc = await fs.readJson(path.join(Paths.ROOT_DIR, '.babelrc'));
    const eslintrc = commentJson.parse(await fs.readFile('.eslintrc'));
    const stylelintrc = commentJson.parse(await fs.readFile('.stylelintrc'));
    const sources = await globby(globs);
    const modules = [
      ...await regexFiles(sources, IMPORTS_REGEX, REQUIRES_REGEX),
      ...flattenDeep(BaseWebpackConfig.module.rules.map(r => r.use.map(u => u.loader))),
      ...babelrc.presets.map(p => `babel-preset-${p[0]}`),
      ...(((babelrc.env || {}).production || {}).presets || []).map(p => `babel-preset-${p}`),
      ...(((babelrc.env || {}).development || {}).presets || []).map(p => `babel-preset-${p}`),
      ...babelrc.plugins.map(p => `babel-plugin-${p}`),
      eslintrc.parser,
      ...eslintrc.plugins.map(p => `eslint-plugin-${p}`),
      ...eslintrc.extends.filter(p => !p.startsWith('plugin:')).map(p => `eslint-config-${p}`),
      ...stylelintrc.plugins,
      ...stylelintrc.extends,
    ];

    // Stripping out the native node modules should leave only the third-party
    // dependencies used throughout the source code. Including the unimported
    // modules should result in exactly the packages listed in package.json.
    const used = [...modules.filter(m => !isBuiltinModule(m)), ...unimported].sort();
    expect(used).toEqual(allPackages);

    // Make sure no garbage is accumulated in the `unimported` array.
    expect(intersection(unimported, modules)).toEqual([]);
    expect(intersection(unimported, allPackages)).toEqual(unimported);
  });

  it('use the `dependencies` in package.json for shipping code', async () => {
    const globs = [
      `${Paths.SRC_DIR}/**/*.@(js|jsx)`,
      '!**/test/**',
    ];

    const unimported = [
      // Used for the `babel-plugin-transform-runtime` in `babelrc` config file.
      'babel-runtime',

      // Entry paths for `build/webpack/config.browser-frontend.js` config file.
      'font-awesome-webpack',

      // Peer dependencies for `font-awesome-webpack`.
      'font-awesome',
      'less',
    ];

    const sources = await globby(globs);
    const modules = await regexFiles(sources, IMPORTS_REGEX, REQUIRES_REGEX);

    // Stripping out the native node modules should leave only the third-party
    // dependencies used throughout the source code. Including the unimported
    // modules should result in exactly the packages listed in package.json.
    const used = [...modules.filter(m => !isBuiltinModule(m)), ...unimported].sort();
    expect(used).toEqual(packages);

    // Make sure no garbage is accumulated in the `unimported` array.
    expect(intersection(unimported, modules)).toEqual([]);
    expect(intersection(unimported, packages)).toEqual(unimported);
  });

  it('shoudln\'t use the `fs` built-in node module instead of `fs-promise`', async () => {
    const globs = [
      `${Paths.ROOT_DIR}/**/*.@(js|jsx)`,
      `!**/${Paths.LIB_DIR}/**`,
      `!**/${Paths.DIST_DIR}/**`,
      '!**/node_modules/**',
    ];

    const sources = await globby(globs);
    const modules = await regexFiles(sources, IMPORTS_REGEX, REQUIRES_REGEX);

    expect(modules.filter(m => m === 'fs')).toEqual([]);
  });

  it('shoudln\'t use built-in node modules for frontend code', async () => {
    const globs = [
      `${Paths.BROWSER_FRONTEND_SRC}/**/*.@(js|jsx)`,
      '!**/test/**',
    ];

    const sources = await globby(globs);
    const modules = await regexFiles(sources, IMPORTS_REGEX, REQUIRES_REGEX);

    expect(modules.filter(m => isBuiltinModule(m) && !(m in NodeLibsBrowser))).toEqual([]);
  });
});
