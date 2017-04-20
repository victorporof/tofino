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

import * as RootSelectors from './root-selectors';

export function getPages(state) {
  return RootSelectors.getAppDomainState(state).get('pages');
}

// Domain page properties getters.

export function getPageById(state, pageId) {
  return getPages(state).get(pageId);
}

export function getPageUrl(state, pageId) {
  return getPageById(state, pageId).get('url');
}

export function getPageMeta(state, pageId) {
  return getPageById(state, pageId).get('meta');
}

// Domain page meta properties getters.

export function getPageLoadState(state, pageId) {
  return getPageMeta(state, pageId).get('loadState');
}

export function getPageTitle(state, pageId) {
  return getPageMeta(state, pageId).get('title');
}

export function getPageFavicon(state, pageId) {
  return getPageMeta(state, pageId).get('favicon');
}

export function getPageBookmarkedState(state, pageId) {
  return getPageMeta(state, pageId).get('bookmarked');
}

export function getPageOwnerId(state, pageId) {
  return getPageMeta(state, pageId).get('tabOwner');
}
