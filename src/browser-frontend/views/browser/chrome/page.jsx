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

import WebContentsActions from '../../../actions/webcontents-actions';
import * as Meta from '../../../constants/meta';

import Styles from './page.css';
import WebContents from '../../../../shared/widgets/web-contents';
import WebView from '../../../../shared/widgets/web-contents/webview';
import IframeDummyBrowser from '../../../../shared/widgets/web-contents/iframe-dummy-browser';
import IframeMozBrowser from '../../../../shared/widgets/web-contents/iframe-mozbrowser';

@connect((state, ownProps) => ({
  platform: Meta.PLATFORM || ownProps.platform,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Page extends PureComponent {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.dispatch(WebContentsActions.events.pageDidMount({ pageId: this.props.pageId }));
  }

  setWebContentsRef = (e) => {
    this._webContents = e;
  }

  handleDidStartLoading = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidStartLoading({ pageId: this.props.pageId, ...args }));
  }

  handleDidStopLoading = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidStopLoading({ pageId: this.props.pageId, ...args }));
  }

  handleDidSucceedLoad = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidSucceedLoad({ pageId: this.props.pageId, ...args }));
  }

  handleDidFailLoad = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidFailLoad({ pageId: this.props.pageId, ...args }));
  }

  handlePageDomReady = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDomReady({ pageId: this.props.pageId, ...args }));
  }

  handlePageTitleSet = (args) => {
    this.props.dispatch(WebContentsActions.events.pageTitleSet({ pageId: this.props.pageId, ...args }));
  }

  handlePageFaviconsSet = (args) => {
    this.props.dispatch(WebContentsActions.events.pageFaviconsSet({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigate = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidNavigate({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigateInternal = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidNavigateInternal({ pageId: this.props.pageId, ...args }));
  }

  handleDidNavigateToNewWindow = (args) => {
    this.props.dispatch(WebContentsActions.events.pageDidNavigateToNewWindow({ parentId: this.props.pageId, ...args }));
  }

  render() {
    let impl;
    if (this.props.platform === 'electron') {
      impl = WebView;
    } else if (this.props.platform === 'dummy') {
      impl = IframeDummyBrowser;
    } else if (this.props.platform === 'qbrt') {
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
  platform: PropTypes.string.isRequired,
};
