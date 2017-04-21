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

import Connection from '../connection';
import SharedActions from '../../shared/actions/shared-actions';
import FrontendConnectionsModelActions from '../actions/frontend-connections-model-actions';
import * as FrontendConnectionsSelectors from '../selectors/frontend-connections-selectors';

function* onClientHello({ meta: frontendConn, payload: { clientMetaData } }) {
  const frontendConnId = frontendConn.id;
  yield put(FrontendConnectionsModelActions.addFrontendConnection({ frontendConnId, clientMetaData }));
}

function* onRequestedCloseWindow({ meta: frontendConn }) {
  const frontendConnId = frontendConn.id;
  const { runnerConnId, winId } = yield select(FrontendConnectionsSelectors.getFrontendClientMetaData, frontendConnId);

  const runnerConn = Connection.getWithId(runnerConnId);
  yield call([runnerConn, runnerConn.send], SharedActions.commands.fromServer.toRunner.app.window.close({ winId }));
}

function* onRequestedMinimizeWindow({ meta: frontendConn }) {
  const frontendConnId = frontendConn.id;
  const { runnerConnId, winId } = yield select(FrontendConnectionsSelectors.getFrontendClientMetaData, frontendConnId);

  const runnerConn = Connection.getWithId(runnerConnId);
  yield call([runnerConn, runnerConn.send], SharedActions.commands.fromServer.toRunner.app.window.minimize({ winId }));
}

function* onRequestedMaximizeWindow({ meta: frontendConn }) {
  const frontendConnId = frontendConn.id;
  const { runnerConnId, winId } = yield select(FrontendConnectionsSelectors.getFrontendClientMetaData, frontendConnId);

  const runnerConn = Connection.getWithId(runnerConnId);
  yield call([runnerConn, runnerConn.send], SharedActions.commands.fromServer.toRunner.app.window.maximize({ winId }));
}

function* onRequestedQuit({ meta: frontendConn }) {
  const frontendConnId = frontendConn.id;
  const { runnerConnId } = yield select(FrontendConnectionsSelectors.getFrontendClientMetaData, frontendConnId);

  const runnerConn = Connection.getWithId(runnerConnId);
  yield call([runnerConn, runnerConn.send], SharedActions.commands.fromServer.toRunner.platform.quit());
}

export default function* () {
  yield [
    takeEvery(SharedActions.events.fromFrontend.toServer.client.hello, onClientHello),
    takeEvery(SharedActions.events.fromFrontend.toServer.app.window.requestedClose, onRequestedCloseWindow),
    takeEvery(SharedActions.events.fromFrontend.toServer.app.window.requestedMinimize, onRequestedMinimizeWindow),
    takeEvery(SharedActions.events.fromFrontend.toServer.app.window.requestedMaximize, onRequestedMaximizeWindow),
    takeEvery(SharedActions.events.fromFrontend.toServer.app.window.requestedQuit, onRequestedQuit),
  ];
}
