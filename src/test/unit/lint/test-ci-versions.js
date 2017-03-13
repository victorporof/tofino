// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import expect from 'expect';
import { version } from '../../../../package.json';

describe('manifest version', () => {
  if ('TRAVIS_TAG' in process.env && process.env.TRAVIS_TAG !== '') {
    it('should match the tag version', () => {
      expect(`v${version}`).toEqual(process.env.TRAVIS_TAG);
    });
  }

  if ('APPVEYOR_REPO_TAG_NAME' in process.env && process.env.APPVEYOR_REPO_TAG_NAME !== '') {
    it('should match the tag version', () => {
      expect(`v${version}`).toEqual(process.env.APPVEYOR_REPO_TAG_NAME);
    });
  }
});
