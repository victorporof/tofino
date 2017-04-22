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

export default class NoopBrowser extends PureComponent {
  constructor(...args) {
    super(...args);
  }

  navigateTo = (url) => {
    this.props.onDidStartLoading();
    this.props.onDidNavigate({ url });
    this.props.onPageDomReady();
    this.props.onDidSucceedLoad();
    this.props.onDidStopLoading();
  }

  goBack = () => {
    throw new Error('Not implemented.');
  }

  goForward = () => {
    throw new Error('Not implemented.');
  }

  reload = () => {
    throw new Error('Not implemented.');
  }

  render() {
    return <div className={this.props.className} />;
  }
}

NoopBrowser.propTypes = WebContents.implPropTypes;
NoopBrowser.defaultProps = WebContents.defaultProps;
