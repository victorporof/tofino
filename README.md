# Photino!

[![Travis](https://api.travis-ci.org/victorporof/tofino.svg?branch=bfg-browser)](https://travis-ci.org/victorporof/tofino)

An implementation of Photon styling on top of Tofino.

## How to run

1. `git clone git@github.com:victorporof/tofino.git`
2. `cd tofino`
3. `git checkout bfg-browser`
4. `npm install`

### Develop

* `npm start` is for the optimized build for Electron only.
* `npm run dev+logging` is  for an Electron build with access to developer tools and logging.
* `npm run qbrt+logging` is for a Gecko build with logging.
* `npm run serve+logging` is for running the frontend headless.
  * Pass in `-- --browser <app> --mock-os <os>` to configure how the frontend is served.
    * `<app>` e.g. `firefox`. Leaving the `--browser` option out will open in your default browser.
    * `<os>` e.g. `win32`, `linux` or `darwin`, will make the UI look as it would on the sepcified platform. Leaving the `--os` option out will use your current platform.

Leaving out `+logging` in the above commands will disable logging, resulting in some perf gains in the frontend.

### Build for other people

* `npm run package`
  * Pass in `-- --platform <os>` to package for specified platforms. `<os>` could be `win32`, `linux` or `darwin`, or `all` to package for all platforms.

### Test

* `npm run test` will run all the tests.
  * Pass in `-- --unit <glob>` to only run mocha tests whose filename matches `<glob>`.
* `npm run fix` will automatically fix some eslint errors.

### Troubleshoot

#### Having trouble building, or something doesn't feel right?

* `npm run clean` will do a "soft clobber", removing any local or packaged builds.
* `npm run clean`, `rm -rf node_modules` followed by `npm install` will clobber and reinstall all node modules
* If all else fails, `git clean` will remove everything which isn't tracked. Be careful not to lose your work.
