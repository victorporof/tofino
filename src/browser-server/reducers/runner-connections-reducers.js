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

import { makeDefaultRunnerConnections } from '../model';
import RunnerConnectionsModelActions from '../actions/runner-connections-model-actions';
import RunnerConnectionModel from '../model/runner-connection-model';
import RunnerClientMetaDataModel from '../model/runner-client-meta-data-model';
import WindowsModelActions from '../actions/windows-model-actions';
import WindowModel from '../model/window-model';

function addRunnerConnection(state, { payload: { runnerConnId, clientMetaData } }) {
  return state.set(runnerConnId, new RunnerConnectionModel({
    clientMetaData: new RunnerClientMetaDataModel({
      os: clientMetaData.os,
      platform: clientMetaData.platform,
    }),
  }));
}

function removeRunnerConnection(state, { payload: { runnerConnId } }) {
  return state.delete(runnerConnId);
}

function addWindow(state, { payload: { runnerConnId, winId } }) {
  const win = new WindowModel();
  return state.updateIn([runnerConnId, 'windows'], m => m.set(winId, win));
}

function removeWindow(state, { payload: { runnerConnId, winId } }) {
  return state.updateIn([runnerConnId, 'windows'], m => m.delete(winId));
}

function setDevToolsOpen(state, { payload: { runnerConnId, winId } }) {
  return state.setIn([runnerConnId, 'windows', winId, 'devToolsOpen'], true);
}

function setDevToolsClosed(state, { payload: { runnerConnId, winId } }) {
  return state.deleteIn([runnerConnId, 'windows', winId, 'devToolsOpen']);
}

export default handleActions({
  [RunnerConnectionsModelActions.addRunnerConnection]: addRunnerConnection,
  [RunnerConnectionsModelActions.removeRunnerConnection]: removeRunnerConnection,
  [WindowsModelActions.addWindow]: addWindow,
  [WindowsModelActions.removeWindow]: removeWindow,
  [WindowsModelActions.window.setDevToolsOpen]: setDevToolsOpen,
  [WindowsModelActions.window.setDevToolsClosed]: setDevToolsClosed,
}, makeDefaultRunnerConnections());
