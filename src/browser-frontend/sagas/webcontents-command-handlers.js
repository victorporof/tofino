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

import { takeEvery, take, call, put, select } from 'redux-saga/effects';

import * as Endpoints from '../constants/endpoints';
import WebContents from '../../shared/widgets/web-contents';
import WebContentsEffects from '../actions/effects/webcontents-effects';
import PagesModelActions from '../actions/model/pages-model-actions';
import DomainPageTransientModel from '../model/domain-page-transient-model';
import * as DomainPagesSelectors from '../selectors/domain-pages-selectors';

function* navigatePageTo({ payload: { pageId, url } }) {
  const prevUrl = yield select(DomainPagesSelectors.getPageUrl, pageId);

  const webContents = WebContents.getWebContentsWithId(pageId);
  yield put(PagesModelActions.resetPageData({ pageId }));
  yield put(PagesModelActions.setPageUrl({ pageId, url }));
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageTransientModel.LOAD_STATES.CONNECTING,
  }));

  if ((prevUrl === Endpoints.BLANK_PAGE && url !== Endpoints.BLANK_PAGE) ||
      (prevUrl !== Endpoints.BLANK_PAGE && url === Endpoints.BLANK_PAGE)) {
    yield take(WebContentsEffects.events.pageDidChangeImpl);
  }

  yield call(webContents.impl.navigateTo, url);
}

function* navigatePageBack({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  const canGoBack = yield call(webContents.impl.canGoBack);
  if (!canGoBack) {
    return;
  }

  yield put(PagesModelActions.resetPageData({ pageId }));
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageTransientModel.LOAD_STATES.CONNECTING,
  }));
  yield call(webContents.impl.goBack);
}

function* navigatePageForward({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  const canGoForward = yield call(webContents.impl.canGoForward);
  if (!canGoForward) {
    return;
  }

  yield put(PagesModelActions.resetPageData({ pageId }));
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageTransientModel.LOAD_STATES.CONNECTING,
  }));
  yield call(webContents.impl.goForward);
}

function* navigatePageRefresh({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  const canReload = yield call(webContents.impl.canReload);
  if (!canReload) {
    return;
  }

  yield put(PagesModelActions.resetPageData({ pageId }));
  yield put(PagesModelActions.setPageLoadState({
    pageId,
    loadState: DomainPageTransientModel.LOAD_STATES.CONNECTING,
  }));
  yield call(webContents.impl.reload);
}

export default function* () {
  yield [
    takeEvery(WebContentsEffects.commands.navigatePageTo, navigatePageTo),
    takeEvery(WebContentsEffects.commands.navigatePageBack, navigatePageBack),
    takeEvery(WebContentsEffects.commands.navigatePageForward, navigatePageForward),
    takeEvery(WebContentsEffects.commands.navigatePageRefresh, navigatePageRefresh),
  ];
}
