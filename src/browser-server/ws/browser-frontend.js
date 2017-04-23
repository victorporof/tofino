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

import colors from 'colour';

import logger from '../logger';

import FrontendConnection from '../frontend-connection';
import FrontendConnectionsModelActions from '../actions/frontend-connections-model-actions';

async function onConnectionClosed(store, conn) {
  logger.log(colors.green(`WebSocket connection to browser frontend closed: ${conn.id}.`));
  store.dispatch(FrontendConnectionsModelActions.removeFrontendConnection({ frontendConnId: conn.id }));
}

async function onConnectionEstablished(wss, ws, store) {
  const conn = new FrontendConnection({ server: wss, pipe: ws, store, logger });
  await conn.listen();

  logger.log(colors.green(`WebSocket connection to browser frontend established: ${conn.id}.`));
  ws.on('disconnect', () => onConnectionClosed(store, conn));
}

export default ({ pathname, wss, store }) => {
  wss.of(pathname).on('connection', ws => onConnectionEstablished(wss, ws, store));
};
