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

import { takeEvery, call, put, select } from 'redux-saga/effects';

import { client } from '../global';
import SharedActions from '../../shared/actions/shared-actions';
import KeyboardShortcutsEffects from '../actions/effects/keyboard-shortcuts-effects';
import PagesModelActions from '../actions/model/pages-model-actions';
import * as DomainPagesSelectors from '../selectors/domain-pages-selectors';
import * as UIPagesSelectors from '../selectors/ui-pages-selectors';

function* handleAccelQ() {
  yield call([client, client.send], SharedActions.events.fromFrontend.toServer.app.window.requestedQuit());
}

function* handleAccelW() {
  const count = (yield select(DomainPagesSelectors.getAllPages)).count();
  if (count === 1) {
    client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedClose());
    return;
  }

  const selectedPageId = yield select(UIPagesSelectors.getSelectedPageId);
  yield put(PagesModelActions.removePage({ pageId: selectedPageId }));
}

function* handleAccelT() {
  yield put(PagesModelActions.addPage());
}

function* handleCtrlTab() {
  const pageId = yield select(UIPagesSelectors.getNextSelectedPage);
  if (pageId) {
    yield put(PagesModelActions.setSelectedPage({ pageId }));
  }
}

function* handleCtrlShiftTab() {
  const pageId = yield select(UIPagesSelectors.getPreviousSelectedPage);
  if (pageId) {
    yield put(PagesModelActions.setSelectedPage({ pageId }));
  }
}

function* handleCatGifsEasterEgg() {
  const url = 'http://chilloutandwatchsomecatgifs.com/';
  yield put(PagesModelActions.addPage({ url }));
}

export default function* () {
  yield [
    takeEvery(KeyboardShortcutsEffects.commands.handleAccelQ, handleAccelQ),
    takeEvery(KeyboardShortcutsEffects.commands.handleAccelW, handleAccelW),
    takeEvery(KeyboardShortcutsEffects.commands.handleAccelT, handleAccelT),
    takeEvery(KeyboardShortcutsEffects.commands.handleCtrlTab, handleCtrlTab),
    takeEvery(KeyboardShortcutsEffects.commands.handleCtrlShiftTab, handleCtrlShiftTab),
    takeEvery(KeyboardShortcutsEffects.commands.handleCatGifsEasterEgg, handleCatGifsEasterEgg),
  ];
}
