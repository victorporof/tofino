# Photino!

[![Travis](https://api.travis-ci.org/victorporof/tofino.svg?branch=bfg-browser)](https://travis-ci.org/victorporof/tofino)

An implementation of Photon styling on top of Tofino.

## How to run
1. `git clone git@github.com:victorporof/tofino.git`
2. `cd tofino`
3. `git checkout bfg-browser`
4. `npm install`

* To develop:
  1. `npm start` is for the optimized build for Electron only.
  2. `npm run dev+logging` is  for an Electron build with access to developer tools and logging.
  3. `npm run qbrt+logging` is for a Gecko build with logging.
  4. `npm run serve+logging -- --browser firefox --mock-os linux` for running in Firefox with our nice devtools.
    * `--mock-os` can also be `win32` or `darwin`.
    * Leaving the `--browser` option out will open in your default browser.

* To build for other people: `npm run package`

* To test: `npm run test`
