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

import { delay } from 'redux-saga';
import { takeEvery, call, put, select } from 'redux-saga/effects';

import WebContents from '../../shared/widgets/web-contents';
import WebContentsActions from '../actions/webcontents-actions';
import PagesModelActions from '../actions/pages-model-actions';
import UIPageModel from '../model/ui-page-model';
import DomainPageMetaModel from '../model/domain-page-meta-model';
import * as DomainPagesSelectors from '../selectors/domain-pages-selectors';

function* navigatePageTo({ payload: { pageId, url } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.navigateTo, url);
}

function* navigatePageBack({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.goBack);
}

function* navigatePageForward({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.goForward);
}

function* navigatePageRefresh({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.reload);
}

function* onPageDidMount({ payload: { pageId } }) {
  const url = yield select(DomainPagesSelectors.getPageUrl, pageId);
  yield put(WebContentsActions.commands.navigatePageTo({ pageId, url }));
}

function* onPageDidStartLoading({ payload: { pageId } }) {
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageMetaModel.LOAD_STATES.LOADING,
  }));
}

function* onPageDidStopLoading({ payload: { pageId } }) {
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageMetaModel.LOAD_STATES.LOADED,
  }));

  // Set the tab state class in order to show the loaded flash,
  // then once we are sure the flash is finished set the tab back to the usual state.
  yield put(PagesModelActions.tabbar.setTabState({
    pageId,
    tabState: UIPageModel.TAB_STATES.TABLOADED,
  }));
  yield call(delay, 400);
  yield put(PagesModelActions.tabbar.setTabState({
    pageId,
    tabState: UIPageModel.TAB_STATES.OPEN,
  }));
}

function* onPageDidSucceedLoad() {
  // TOOD
}

function* onPageDidFailLoad() {
  // TOOD
}

function* onPageTitleSet({ payload: { pageId, title } }) {
  yield put(PagesModelActions.setPageTitle({
    pageId,
    title,
  }));
}

function* onPageFaviconSet({ payload: { pageId, favicon } }) {
  yield put(PagesModelActions.setPageFavicon({
    pageId,
    favicon,
  }));
}

function* onPageDidNavigate({ payload: { pageId, url } }) {
  yield put(PagesModelActions.setPageUrl({
    pageId,
    url,
  }));
  yield put(PagesModelActions.navbar.setLocationInputBarValue({
    pageId,
    value: url,
  }));
}

function* onPageDidNavigateInternal() {
  // TODO
}

function* onPageDidNavigateToNewWindow({ payload: { parentId, url } }) {
  yield put(PagesModelActions.addPage({ parentId, url, background: false }));

  // Add class to prevent the deselect animation of the parent tab when opening a child tab
  // then remove class once deselect is finished.
  yield put(PagesModelActions.tabbar.changeOptionalTabClass({ pageId: parentId, optionalClass: 'noanimate' }));
  yield call(delay, 200);
  yield put(PagesModelActions.tabbar.changeOptionalTabClass({ parentId, optionalClass: '' }));
}

export default function* () {
  yield [
    takeEvery(WebContentsActions.commands.navigatePageTo, navigatePageTo),
    takeEvery(WebContentsActions.commands.navigatePageBack, navigatePageBack),
    takeEvery(WebContentsActions.commands.navigatePageForward, navigatePageForward),
    takeEvery(WebContentsActions.commands.navigatePageRefresh, navigatePageRefresh),
    takeEvery(WebContentsActions.events.pageDidMount, onPageDidMount),
    takeEvery(WebContentsActions.events.pageDidStartLoading, onPageDidStartLoading),
    takeEvery(WebContentsActions.events.pageDidStopLoading, onPageDidStopLoading),
    takeEvery(WebContentsActions.events.pageDidSucceedLoad, onPageDidSucceedLoad),
    takeEvery(WebContentsActions.events.pageDidFailLoad, onPageDidFailLoad),
    takeEvery(WebContentsActions.events.pageTitleSet, onPageTitleSet),
    takeEvery(WebContentsActions.events.pageFaviconSet, onPageFaviconSet),
    takeEvery(WebContentsActions.events.pageDidNavigate, onPageDidNavigate),
    takeEvery(WebContentsActions.events.pageDidNavigateInternal, onPageDidNavigateInternal),
    takeEvery(WebContentsActions.events.pageDidNavigateToNewWindow, onPageDidNavigateToNewWindow),
  ];
}
