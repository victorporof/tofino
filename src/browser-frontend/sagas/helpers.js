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

import { call, put } from 'redux-saga/effects';

import WebContents from '../../shared/widgets/web-contents';
import PagesModelActions from '../actions/pages-model-actions';

export function* updateNavigationButtonsEnabledState({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  const canGoBack = yield call(webContents.impl.canGoBack);
  if (canGoBack) {
    yield put(PagesModelActions.navbar.setBackButtonEnabled({ pageId }));
  } else {
    yield put(PagesModelActions.navbar.setBackButtonDisabled({ pageId }));
  }
  const canGoForward = yield call(webContents.impl.canGoForward);
  if (canGoForward) {
    yield put(PagesModelActions.navbar.setForwardButtonEnabled({ pageId }));
  } else {
    yield put(PagesModelActions.navbar.setForwardButtonDisabled({ pageId }));
  }
  const canReload = yield call(webContents.impl.canReload);
  if (canReload) {
    yield put(PagesModelActions.navbar.setReloadButtonEnabled({ pageId }));
  } else {
    yield put(PagesModelActions.navbar.setReloadButtonDisabled({ pageId }));
  }
}
