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

import React, { PureComponent } from 'react';

import WebContents from '.';

export default class IframeMozBrowser extends PureComponent {
  constructor(...args) { // eslint-disable-line
    super(...args);
  }

  componentDidMount() {
    this._iframe.addEventListener('mozbrowsertitlechange', (e) => {
      this.props.onPageTitleSet({ title: e.detail });
    });
    this._iframe.addEventListener('mozbrowserlocationchange', (e) => {
      this.props.onDidNavigate({ url: e.detail.url });
    });
    this._iframe.addEventListener('mozbrowserloadstart', (e) => {
      this.props.onDidStartLoading();
    });
    this._iframe.addEventListener('mozbrowserloadend', (e) => {
      this.props.onDidStopLoading();
    });
    this._iframe.addEventListener('mozbrowsererror', (e) => {
      this.props.onDidFailLoad();
    });
  }

  setIframeRef = (e) => {
    this._iframe = e;
  }

  navigateTo = (url) => {
    this._iframe.setAttribute('src', url);
  }

  goBack = () => {
    // These aren't working. The mozbrowser API extensions don't seem to be
    // attached.
    this._iframe.goBack();
  }

  goForward = () => {
    // These aren't working. The mozbrowser API extensions don't seem to be
    // attached.
    this._iframe.goForward();
  }

  reload = () => {
    this._iframe.reload();
  }

  render() {
    return (
      <iframe
        is="iframe"
        ref={this.setIframeRef}
        class={this.props.className}
        mozbrowser="mozbrowser"
        remote="remote"
        frameborder="0"
      />
    );
  }
}

IframeMozBrowser.propTypes = WebContents.implPropTypes;
IframeMozBrowser.defaultProps = WebContents.defaultProps;
