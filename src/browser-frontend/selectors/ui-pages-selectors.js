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

import * as Endpoints from '../constants/endpoints';
import DomainPageTransientModel from '../model/domain-page-transient-model';
import * as RootSelectors from './root-selectors';
import * as DomainPagesSelectors from './domain-pages-selectors';

export function getAppPagesUIState(state) {
  return RootSelectors.getAppUIState(state).get('pages');
}

export function getAllPages(state) {
  return getAppPagesUIState(state).get('pagesUIStateByPageId');
}

export function getSelectedPageId(state) {
  return getAppPagesUIState(state).get('selectedPageId');
}

export function getPageIdsInDisplayOrder(state) {
  return getAppPagesUIState(state).get('displayOrder');
}

// UI page computed selection getters.

export function getPageIdAtIndex(state, index) {
  const pageIds = getPageIdsInDisplayOrder(state);
  return pageIds.get(index);
}

export function getPageIndexById(state, pageId) {
  const pageIds = getPageIdsInDisplayOrder(state);
  return pageIds.findIndex(id => id === pageId);
}

export function getSelectedPageIndex(state) {
  const selectedPageId = getSelectedPageId(state);
  return getPageIndexById(state, selectedPageId);
}

export function getNextSelectedPage(state) {
  const pageIndex = getSelectedPageIndex(state);
  const pageIds = getPageIdsInDisplayOrder(state);
  let newIndex = pageIndex + 1;
  if (newIndex >= pageIds.count()) {
    newIndex = 0;
  }
  if (pageIndex === newIndex) {
    return null;
  }
  return getPageIdAtIndex(state, newIndex);
}

export function getPreviousSelectedPage(state) {
  const pageIndex = getSelectedPageIndex(state);
  const pageIds = getPageIdsInDisplayOrder(state);
  let newIndex = pageIndex - 1;
  if (newIndex < 0) {
    newIndex = pageIds.count() - 1;
  }
  if (pageIndex === newIndex) {
    return null;
  }
  return getPageIdAtIndex(state, newIndex);
}

export function getNextLogicalPageId(state) {
  const pageIndex = getSelectedPageIndex(state);
  const pageIds = getPageIdsInDisplayOrder(state);

  return pageIds.get(pageIndex === pageIds.count() - 1
    ? pageIndex - 1
    : pageIndex + 1);
}

// UI page properties getters.

export function getPageUIStateById(state, pageId) {
  return getAllPages(state).get(pageId);
}

export function getPageLocationInputBarValue(state, pageId) {
  return getPageUIStateById(state, pageId).get('locationInputBarValue');
}

export function getPageBackButtonEnabled(state, pageId) {
  return getPageUIStateById(state, pageId).get('backButtonEnabled');
}

export function getPageForwardButtonEnabled(state, pageId) {
  return getPageUIStateById(state, pageId).get('forwardButtonEnabled');
}

export function getPageReloadButtonEnabled(state, pageId) {
  return getPageUIStateById(state, pageId).get('reloadButtonEnabled');
}

export function getPageTabState(state, pageId) {
  return getPageUIStateById(state, pageId).get('tabState');
}

export function getTabAnimationsDisabled(state, pageId) {
  return getPageUIStateById(state, pageId).get('tabAnimationsDisabled');
}

export function getTabLoadAnimationRunning(state, pageId) {
  return getPageUIStateById(state, pageId).get('tabLoadAnimationRunning');
}

export function getTabLoadAnimationPlayCount(state, pageId) {
  return getPageUIStateById(state, pageId).get('tabLoadAnimationPlayCount');
}

// UI page computed properties getters.

export function getComputedPageDisplayTitle(state, pageId) {
  const loadState = DomainPagesSelectors.getPageLoadState(state, pageId);
  if (loadState === DomainPageTransientModel.LOAD_STATES.INITIAL ||
      loadState === DomainPageTransientModel.LOAD_STATES.CONNECTING) {
    return 'Connecting…';
  }
  const url = DomainPagesSelectors.getPageUrl(state, pageId);
  if (url === Endpoints.BLANK_PAGE) {
    return 'New Tab';
  }
  const title = DomainPagesSelectors.getPageTitle(state, pageId);
  if (title === DomainPageTransientModel.UNKNOWN_TITLE) {
    return 'Loading…';
  }
  return title;
}

export function getComputedPageFaviconCssUrl(state, pageId) {
  const url = DomainPagesSelectors.getPageUrl(state, pageId);
  if (url === Endpoints.BLANK_PAGE) {
    return 'var(--theme-app-icon-32)';
  }
  const favicon = DomainPagesSelectors.getPageFavicons(state, pageId).get(0);
  if (favicon) {
    return `url(${favicon})`;
  }
  return undefined;
}

export function getComputedPageTooltipText(state, pageId) {
  const title = DomainPagesSelectors.getPageTitle(state, pageId);
  const url = DomainPagesSelectors.getPageUrl(state, pageId);
  return title || url;
}

export function getComputedLocationInputbarWantsFocus(state, pageId) {
  const url = DomainPagesSelectors.getPageUrl(state, pageId);
  const selected = getSelectedPageId(state) === pageId;
  return url === Endpoints.BLANK_PAGE && selected;
}
