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

import PagesEffects from '../actions/effects/pages-effects';
import PagesModelActions from '../actions/model/pages-model-actions';
import UIPageModel from '../model/ui-page-model';
import * as UIPagesSelectors from '../selectors/ui-pages-selectors';

function* closeTabAnimated({ payload: { pageId, removePageAfterMs } }) {
  const selectedPageId = yield select(UIPagesSelectors.getSelectedPageId);
  const nextSelectedPageId = yield select(UIPagesSelectors.getNextLogicalPageId);

  const tabState = selectedPageId === pageId
    ? UIPageModel.TAB_STATES.FOREGROUND_CLOSED
    : UIPageModel.TAB_STATES.BACKGROUND_CLOSED;

  yield put(PagesModelActions.tabbar.setTabState({
    pageId,
    tabState,
  }));

  if (tabState === UIPageModel.TAB_STATES.FOREGROUND_CLOSED) {
    yield put(PagesModelActions.setSelectedPage({
      pageId: nextSelectedPageId,
    }));
  }

  yield call(delay, removePageAfterMs);
  yield put(PagesModelActions.removePage({
    pageId,
    withoutSelectingNextLogicalPage: true,
  }));
}

function* reorderTabsAnimated({ payload: { oldIndex, newIndex } }) {
  const pageIds = yield select(UIPagesSelectors.getPageIdsInDisplayOrder);
  const reorderedPageId = yield select(UIPagesSelectors.getPageIdAtIndex, oldIndex);

  for (const pageId of pageIds.values()) {
    if (pageId !== reorderedPageId) {
      yield put(PagesModelActions.tabbar.setAllTabAnimationsDisabled({ pageId }));
    }
  }

  yield put(PagesModelActions.tabbar.changeDisplayOrder({ oldIndex, newIndex }));
  yield call(delay, 50);

  for (const pageId of pageIds.values()) {
    if (pageId !== reorderedPageId) {
      yield put(PagesModelActions.tabbar.setAllTabAnimationsEnabled({ pageId }));
    }
  }
}

export default function* () {
  yield [
    takeEvery(PagesEffects.commands.closeTabAnimated, closeTabAnimated),
    takeEvery(PagesEffects.commands.reorderTabsAnimated, reorderTabsAnimated),
  ];
}
