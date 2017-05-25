/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/

import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import WebContentsEffects from '../../../actions/effects/webcontents-effects';
import * as Meta from '../../../constants/meta';
import * as Endpoints from '../../../constants/endpoints';
import * as DomainPagesSelectors from '../../../selectors/domain-pages-selectors';

import Styles from './page.css';
import WebContents from '../../../../shared/widgets/web-contents';
import NoopBrowser from '../../../../shared/widgets/web-contents/noop-browser';
import WebView from '../../../../shared/widgets/web-contents/webview';
import IframeDummyBrowser from '../../../../shared/widgets/web-contents/iframe-dummy-browser';
import IframeMozBrowser from '../../../../shared/widgets/web-contents/iframe-mozbrowser';

@connect((state, ownProps) => {
  const url = DomainPagesSelectors.getPageUrl(state, ownProps.pageId);
  return {
    implType: (url === Endpoints.BLANK_PAGE ? 'noop' : Meta.PLATFORM) || ownProps.implType,
  };
})
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Page extends PureComponent {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.dispatch(WebContentsEffects.events.pageDidMount({ pageId: this.props.pageId }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.implType !== prevProps.implType) {
      this.props.dispatch(WebContentsEffects.events.pageDidChangeImpl({ pageId: this.props.pageId }));
    }
  }

  setWebContentsRef = (e) => {
    this._webContents = e;
  }

  handleDidStartLoading = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidStartLoading({ pageId: this.props.pageId, ...args }));
  }

  handleDidStopLoading = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidStopLoading({ pageId: this.props.pageId, ...args }));
  }

  handleDidSucceedLoad = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidSucceedLoad({ pageId: this.props.pageId, ...args }));
  }

  handleDidFailLoad = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidFailLoad({ pageId: this.props.pageId, ...args }));
  }

  handlePageDomReady = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDomReady({ pageId: this.props.pageId, ...args }));
  }

  handlePageTitleSet = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageTitleSet({ pageId: this.props.pageId, ...args }));
  }

  handlePageFaviconsSet = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageFaviconsSet({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigate = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidNavigate({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigateInternal = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidNavigateInternal({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigateToNewWindow = (args) => {
    this.props.dispatch(WebContentsEffects.events.pageDidNavigateToNewWindow({ parentId: this.props.pageId, ...args }));
  }

  render() {
    let impl;
    if (this.props.implType === 'noop') {
      impl = NoopBrowser;
    } else if (this.props.implType === 'electron') {
      impl = WebView;
    } else if (this.props.implType === 'dummy') {
      impl = IframeDummyBrowser;
    } else if (this.props.implType === 'qbrt') {
      impl = IframeMozBrowser;
    } else {
      throw new Error('Unknown browser runner platform.');
    }
    return (
      <WebContents
        impl={impl}
        id={this.props.pageId}
        ref={this.setWebContentsRef}
        styleName="page"
        onDidStartLoading={this.handleDidStartLoading}
        onDidStopLoading={this.handleDidStopLoading}
        onDidSucceedLoad={this.handleDidSucceedLoad}
        onDidFailLoad={this.handleDidFailLoad}
        onPageDomReady={this.handlePageDomReady}
        onPageTitleSet={this.handlePageTitleSet}
        onPageFaviconsSet={this.handlePageFaviconsSet}
        onDidNavigate={this.handleDidNavigate}
        onDidNavigateInternal={this.handleDidNavigateInternal}
        onDidNavigateToNewWindow={this.handleDidNavigateToNewWindow}
      />
    );
  }
}

Page.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  implType: PropTypes.string.isRequired,
};
