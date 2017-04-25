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

export default class NoopBrowser extends BrowserComponentAPI {
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

  render() {
    return <div className={this.props.className} />;
  }
}
