// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';

import { configureStore } from '../../../shared/store/configure';
import { setupInitialState } from '../../setup';
import RootReducer from '../../reducers/root-reducer';
import RootSaga from '../..//sagas/root-saga';
import Page from '../../views/browser/chrome/page';
import IframeDummyBrowser from '../../../shared/widgets/web-contents/iframe-dummy-browser';
import * as UIPagesSelectors from '../../selectors/ui-pages-selectors';

describe('rendering components', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducers: RootReducer, sagas: RootSaga });
    setupInitialState(store);
  });

  it('can shallow render', () => {
    const wrapper = shallow(
      <Page
        store={store}
        pageId={UIPagesSelectors.getSelectedPageId(store.getState())}
        implType="dummy"
        foo="bar"
      />,
    );

    expect(wrapper).toExist();
    expect(wrapper).toBeA('Page');

    expect(wrapper).toHaveProp('foo', 'bar');
    expect(wrapper).toHaveProp('pageId', UIPagesSelectors.getSelectedPageId(store.getState()));

    wrapper.setProps({ foo: 'baz' });
    expect(wrapper).toHaveProp('foo', 'baz');
  });

  it('can deep render with full DOM APIs', () => {
    const wrapper = mount(
      <Page
        store={store}
        pageId={UIPagesSelectors.getSelectedPageId(store.getState())}
        implType="dummy"
        foo="bar"
      />,
    );

    expect(wrapper).toExist();
    expect(wrapper).toBeA('Connect(Page)');

    expect(wrapper).toHaveProp('foo', 'bar');
    expect(wrapper).toHaveProp('pageId', UIPagesSelectors.getSelectedPageId(store.getState()));

    wrapper.setProps({ foo: 'baz' });
    expect(wrapper).toHaveProp('foo', 'baz');
  });

  it('can shallow render without `connect`', () => {
    const noop = () => {};

    const wrapper = shallow(
      <Page.WrappedComponent
        dispatch={noop}
        pageId={UIPagesSelectors.getSelectedPageId(store.getState())}
        implType="dummy"
      />,
    );

    expect(wrapper).toExist();
    expect(wrapper).toBeA('WebContents');

    expect(wrapper).toHaveProp('id', UIPagesSelectors.getSelectedPageId(store.getState()));
    expect(wrapper).toHaveProp('impl', IframeDummyBrowser);
  });

  it('can deep render with full DOM APIs without `connect`', () => {
    const noop = () => {};

    const wrapper = mount(
      <Page.WrappedComponent
        dispatch={noop}
        pageId={UIPagesSelectors.getSelectedPageId(store.getState())}
        implType="dummy"
      />,
    );

    expect(wrapper).toExist();
    expect(wrapper).toBeA('Page');

    expect(wrapper).toHaveProp('pageId', UIPagesSelectors.getSelectedPageId(store.getState()));
    expect(wrapper).toHaveProp('implType', 'dummy');
  });

  it('throws when required `connect` props are not supplied', () => {
    try {
      shallow(<Page />);
      expect().fail();
    } catch (e) {
      expect(e.message).toMatch(
        /^Could not find "store" in either the context or props of "Connect\(Page\)"/);
    }
  });

  it('throws when required component props are not supplied (1)', () => {
    try {
      shallow(<Page store={store} />);
      expect().fail();
    } catch (e) {
      expect(e.message).toMatch(
        /^Cannot read property \'get\' of undefined/); // eslint-disable-line
    }
  });

  it('throws when required component props are not supplied (2)', () => {
    try {
      shallow(<Page
        store={store}
        pageId={UIPagesSelectors.getSelectedPageId(store.getState())}
      />);
      expect().fail();
    } catch (e) {
      expect(e.message).toMatch(
        /^Warning: Failed prop type: The prop `implType` is marked as required in `Page`, but its value is `undefined`/); // eslint-disable-line
    }
  });
});
