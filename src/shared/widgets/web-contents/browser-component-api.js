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

import { PureComponent, PropTypes } from 'react';
import identity from 'lodash/identity';

export default class BrowserComponentAPI extends PureComponent {
  constructor(...args) {
    super(...args);
  }

  navigateTo = () => identity
  canGoBack = () => false
  canGoForward = () => false
  canReload = () => false
  goBack = () => identity
  goForward = () => identity
  reload = () => identity

  render() {
    return null;
  }
}

BrowserComponentAPI.propTypes = {
  className: PropTypes.string,
  onDidStartLoading: PropTypes.func,
  onDidStopLoading: PropTypes.func,
  onDidSucceedLoad: PropTypes.func,
  onDidFailLoad: PropTypes.func,
  onPageDomReady: PropTypes.func,
  onPageTitleSet: PropTypes.func,
  onPageFaviconsSet: PropTypes.func,
  onDidNavigate: PropTypes.func,
  onDidNavigateInternal: PropTypes.func,
  onDidNavigateToNewWindow: PropTypes.func,
};

BrowserComponentAPI.defaultProps = {
  className: '',
  onDidStartLoading: identity,
  onDidStopLoading: identity,
  onDidSucceedLoad: identity,
  onDidFailLoad: identity,
  onPageDomReady: identity,
  onPageTitleSet: identity,
  onPageFaviconsSet: identity,
  onDidNavigate: identity,
  onDidNavigateInternal: identity,
  onDidNavigateToNewWindow: identity,
};
