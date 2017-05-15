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

import Immutable from 'immutable';

import { handleActions } from 'redux-actions';
import uuid from 'uuid/v4';
import isUUID from 'is-uuid';

import Model from '../model';
import * as Endpoints from '../constants/endpoints';
import PagesModelActions from '../actions/model/pages-model-actions';
import DomainPageModel from '../model/domain-page-model';
import UIPageModel from '../model/ui-page-model';

function addPage(state, { payload: { url, parentId, background } = {} }) {
  return state.withMutations((mut) => {
    const pageId = uuid();
    const pageUrl = url || Endpoints.NEW_PAGE_URL;

    const pageDomainState = new DomainPageModel({ id: pageId, ownerId: parentId, url: pageUrl });
    const pageUIState = new UIPageModel({ locationInputBarValue: pageUrl });
    mut.updateIn(['domain', 'pages', 'pagesDomainStateByPageId'], m => m.set(pageId, pageDomainState));
    mut.updateIn(['ui', 'pages', 'pagesUIStateByPageId'], m => m.set(pageId, pageUIState));

    const pageCount = state.ui.pages.displayOrder.count();
    const pageIndex = parentId ? state.ui.pages.displayOrder.findIndex(id => id === parentId) + 1 : pageCount;
    mut.updateIn(['ui', 'pages', 'displayOrder'], l => l.insert(pageIndex, pageId));

    if (!background) {
      mut.setIn(['ui', 'pages', 'selectedPageId'], pageId);
    }
  });
}

function removePage(state, { payload: { pageId, withoutSelectingNextLogicalPage } }) {
  if (!isUUID.v4(pageId)) {
    throw new Error('Can\'t remove page with malformed id.');
  }

  return state.withMutations((mut) => {
    const pageIndex = state.ui.pages.displayOrder.findIndex(id => id === pageId);
    const pageCount = state.ui.pages.displayOrder.count();
    const selectedPageId = state.ui.pages.selectedPageId;

    mut.updateIn(['domain', 'pages', 'pagesDomainStateByPageId'], m => m.delete(pageId));
    mut.updateIn(['ui', 'pages', 'pagesUIStateByPageId'], m => m.delete(pageId));
    mut.updateIn(['ui', 'pages', 'displayOrder'], l => l.delete(pageIndex));

    if (pageCount === 1) {
      mut.deleteIn(['ui', 'pages', 'selectedPageId']);
      return;
    }

    if (pageId !== selectedPageId || withoutSelectingNextLogicalPage) {
      return;
    }

    if (pageIndex === pageCount - 1) {
      mut.setIn(['ui', 'pages', 'selectedPageId'], state.ui.pages.displayOrder.get(pageIndex - 1));
    } else {
      mut.setIn(['ui', 'pages', 'selectedPageId'], state.ui.pages.displayOrder.get(pageIndex + 1));
    }
  });
}

function setSelectedPage(state, { payload: { pageId } }) {
  return state.setIn(['ui', 'pages', 'selectedPageId'], pageId);
}

function resetPageData(state, { payload: { pageId } }) {
  return state.deleteIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient']);
}

function setPageUrl(state, { payload: { pageId, url } }) {
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'url'], url);
}

function setPageLoadState(state, { payload: { pageId, loadState } }) {
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient', 'loadState'], loadState);
}

function setPageTitle(state, { payload: { pageId, title } }) {
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient', 'title'], title);
}

function setPageFavicons(state, { payload: { pageId, favicons } }) {
  const list = Immutable.List(favicons);
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient', 'favicons'], list);
}

function setPageBookmarked(state, { payload: { pageId } }) {
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient', 'bookmarked'], true);
}

function setPageUnbookmarked(state, { payload: { pageId } }) {
  return state.setIn(['domain', 'pages', 'pagesDomainStateByPageId', pageId, 'transient', 'bookmarked'], false);
}

export default handleActions({
  [PagesModelActions.addPage]: addPage,
  [PagesModelActions.removePage]: removePage,
  [PagesModelActions.setSelectedPage]: setSelectedPage,
  [PagesModelActions.resetPageData]: resetPageData,
  [PagesModelActions.setPageUrl]: setPageUrl,
  [PagesModelActions.setPageLoadState]: setPageLoadState,
  [PagesModelActions.setPageTitle]: setPageTitle,
  [PagesModelActions.setPageFavicons]: setPageFavicons,
  [PagesModelActions.setPageBookmarked]: setPageBookmarked,
  [PagesModelActions.setPageUnbookmarked]: setPageUnbookmarked,
}, new Model());
