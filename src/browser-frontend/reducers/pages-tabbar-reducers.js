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

import { handleActions } from 'redux-actions';

import Model from '../model';
import PagesModelActions from '../actions/model/pages-model-actions';

function setTabState(state, { payload: { pageId, tabState } }) {
  return state.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabState'], tabState);
}

function setAllTabAnimationsEnabled(state, { payload: { pageId } }) {
  return state.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabAnimationsDisabled'], false);
}

function setAllTabAnimationsDisabled(state, { payload: { pageId } }) {
  return state.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabAnimationsDisabled'], true);
}

function setTabLoadedAnimationEnabled(state, { payload: { pageId } }) {
  return state.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabLoadAnimationRunning'], true);
}

function setTabLoadedAnimationDisabled(state, { payload: { pageId } }) {
  return state.withMutations((mut) => {
    const playCount = state.ui.pages.pagesUIStateByPageId.get(pageId).tabLoadAnimationPlayCount;
    mut.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabLoadAnimationRunning'], false);
    mut.setIn(['ui', 'pages', 'pagesUIStateByPageId', pageId, 'tabLoadAnimationPlayCount'], playCount + 1);
  });
}

function changeDisplayOrder(state, { payload: { oldIndex, newIndex } }) {
  const pageIds = state.ui.pages.displayOrder;
  const pageId = pageIds.get(oldIndex);
  let newDisplayOrder = pageIds.splice(oldIndex, 1);
  newDisplayOrder = newDisplayOrder.splice(newIndex, 0, pageId);
  return state.setIn(['ui', 'pages', 'displayOrder'], newDisplayOrder);
}

export default handleActions({
  [PagesModelActions.tabbar.setTabState]: setTabState,
  [PagesModelActions.tabbar.setAllTabAnimationsEnabled]: setAllTabAnimationsEnabled,
  [PagesModelActions.tabbar.setAllTabAnimationsDisabled]: setAllTabAnimationsDisabled,
  [PagesModelActions.tabbar.setTabLoadedAnimationEnabled]: setTabLoadedAnimationEnabled,
  [PagesModelActions.tabbar.setTabLoadedAnimationDisabled]: setTabLoadedAnimationDisabled,
  [PagesModelActions.tabbar.changeDisplayOrder]: changeDisplayOrder,
}, new Model());
