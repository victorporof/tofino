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

import React from 'react';

import BrowserComponentAPI from './browser-component-api';

export default class IframeDummyBrowser extends BrowserComponentAPI {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this._iframe.addEventListener('load', () => {
      this.props.onDidStartLoading();
      this.props.onDidNavigate({ url: this._iframe.src });
      this.props.onPageDomReady();
      this.props.onPageTitleSet({ title: this._iframe.src });
      this.props.onDidSucceedLoad();
      this.props.onDidStopLoading();
    });
  }

  setIframeRef = (e) => {
    this._iframe = e;
  }

  navigateTo = (url) => {
    this._iframe.setAttribute('src', url);
  }

  canReload = () =>
    true

  reload = () => {
    this.navigateTo(this._iframe.src);
  }

  render() {
    return (
      <iframe
        is="iframe"
        ref={this.setIframeRef}
        class={this.props.className}
        frameborder="0"
      />
    );
  }
}
