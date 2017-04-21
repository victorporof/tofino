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

import { takeEvery, call, select } from 'redux-saga/effects';

import Connection from '../connection';
import SharedActions from '../../shared/actions/shared-actions';
import * as FrontendConnectionsSelectors from '../selectors/frontend-connections-selectors';

function* registerKeyShortcuts({ meta: frontendConn, payload: shortcuts }) {
  const frontendConnId = frontendConn.id;
  const { runnerConnId, winId } = yield select(FrontendConnectionsSelectors.getFrontendClientMetaData, frontendConnId);

  const action = SharedActions.commands.fromServer.toRunner.app.window.keyShortcuts.register({
    winId,
    shortcuts,
    info: { frontendConnId },
  });

  const runnerConn = Connection.getWithId(runnerConnId);
  yield call([runnerConn, runnerConn.send], action);
}

export default function* () {
  yield [
    takeEvery(SharedActions.commands.fromFrontend.toServer.app.window.keyShortcuts.register, registerKeyShortcuts),
  ];
}
