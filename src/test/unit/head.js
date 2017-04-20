// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import 'jsdom-global/register';

import expect from 'expect';
import enzymify from 'expect-enzyme';
import sinon from 'sinon';
import cssModulesRequireHook from 'css-modules-require-hook';

expect.extend(enzymify);

sinon.stub(console, 'error').callsFake((warning) => {
  if (warning && warning.indexOf('Warning: Failed prop type:') > -1) {
    throw new Error(warning);
  }
});

cssModulesRequireHook({});
