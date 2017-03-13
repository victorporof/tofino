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

import colors from 'colors/safe';

import logger from '../logger';

import Connection from '../connection';
import RunnerConnectionsModelActions from '../actions/runner-connections-model-actions';
import * as RunnerConnectionsSelectors from '../selectors/runner-connections-selectors';

async function onConnectionClosed(store, conn) {
  logger.log(colors.green(`WebSocket connection to browser runner closed: ${conn.id}.`));
  store.dispatch(RunnerConnectionsModelActions.removeRunnerConnection({ runnerConnId: conn.id }));

  const count = RunnerConnectionsSelectors.getAllRunnerConnections(store.getState()).count();
  if (count !== 0) {
    return;
  }

  logger.log(colors.green('No more clients connected, goodbye.'));
  process.exit();
}

async function onConnectionEstablished(wss, ws, store) {
  const conn = new Connection({ server: wss, pipe: ws, store, logger });
  await conn.listen();

  logger.log(colors.green(`WebSocket connection to browser runner established: ${conn.id}.`));
  ws.on('disconnect', () => onConnectionClosed(store, conn));
}

export default ({ pathname, wss, store }) => {
  wss.of(pathname).on('connection', ws => onConnectionEstablished(wss, ws, store));
};
