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

import SharedActions from '../../shared/actions/shared-actions';
import PagesModelActions from '../actions/pages-model-actions';
import * as DomainPagesSelectors from '../selectors/domain-pages-selectors';
import * as UIPagesSelectors from '../selectors/ui-pages-selectors';

function* handleAccelQ({ meta: client }) {
  yield call([client, client.send], SharedActions.events.fromFrontend.toServer.app.window.requestedQuit());
}

function* handleAccelW({ meta: client }) {
  const count = (yield select(DomainPagesSelectors.getPages)).count();
  if (count === 1) {
    client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedClose());
    return;
  }

  const selectedPageId = yield select(UIPagesSelectors.getSelectedPageId);
  yield put(PagesModelActions.removePage({ pageId: selectedPageId }));
}

function* onKeyShortcutPressed({ meta: client, payload: { shortcut } }) {
  if (shortcut.keys === 'CommandOrControl+Q') {
    yield* handleAccelQ({ meta: client });
  } else if (shortcut.keys === 'CommandOrControl+W') {
    yield* handleAccelW({ meta: client });
  }
}

export default function* () {
  yield [
    takeEvery(SharedActions.events.fromServer.toFrontend.app.window.keyShortcuts.pressed, onKeyShortcutPressed),
  ];
}
