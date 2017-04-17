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

import DomainPageMetaModel from '../model/domain-page-meta-model';
import * as RootSelectors from './root-selectors';
import * as PagesSelectors from './domain-pages-selectors';

export function getPagesUI(state) {
  return RootSelectors.getAppUIState(state).get('pages');
}

export function getAllPagesVisuals(state) {
  return getPagesUI(state).get('visuals');
}

export function getSelectedPageId(state) {
  return getPagesUI(state).get('selectedId');
}

export function getPageIdsInDisplayOrder(state) {
  return getPagesUI(state).get('displayOrder');
}

// UI page properties getters.

export function getPageVisuals(state, pageId) {
  return getAllPagesVisuals(state).get(pageId);
}

export function getPageLocationInputBarValue(state, pageId) {
  return getPageVisuals(state, pageId).get('locationInputBarValue');
}

export function getPageTabState(state, pageId) {
  return getPageVisuals(state, pageId).get('tabState');
}

export function getPageOwnerId(state, pageId) {
  return getPageVisuals(state, pageId).get('tabOwner');
}

// UI page computed properties getters.

export function getComputedPageDisplayTitle(state, pageId) {
  const loadState = PagesSelectors.getPageLoadState(state, pageId);
  if (loadState === DomainPageMetaModel.LOAD_STATES.INITIAL ||
      loadState === DomainPageMetaModel.LOAD_STATES.CONNECTING) {
    return 'Connecting…';
  }
  const title = PagesSelectors.getPageTitle(state, pageId);
  if (title === DomainPageMetaModel.UNKNOWN_TITLE) {
    return 'Loading…';
  }
  return title;
}

export function getComputedPageTooltipText(state, pageId) {
  const title = PagesSelectors.getPageTitle(state, pageId);
  const url = PagesSelectors.getPageUrl(state, pageId);
  return title || url;
}
