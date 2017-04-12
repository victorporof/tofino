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

import PagesModelActions from '../actions/pages-model-actions';
import UIPageModel from '../model/ui-page-model';
import { getSelectedPageId } from '../selectors/ui-pages-selectors';

function* closeTabAnimated({ payload: { pageId, removePageAfterMs } }) {
  const selectedPageId = yield select(getSelectedPageId);
  const tabState = selectedPageId === pageId
  ? UIPageModel.TAB_STATES.SELECTEDCLOSED
  : UIPageModel.TAB_STATES.CLOSED;

  yield put(PagesModelActions.tabbar.setTabState({
    pageId,
    tabState,
  }));

  yield put(PagesModelActions.selectNextLogicalPage({
    pageId,
  }));

  yield call(delay, removePageAfterMs);
  yield put(PagesModelActions.removePage({
    pageId,
    withoutSelectingNextLogicalPage: true,
  }));
}

export default function* () {
  yield [
    takeEvery(PagesModelActions.tabbar.closeTabAnimated, closeTabAnimated),
  ];
}
