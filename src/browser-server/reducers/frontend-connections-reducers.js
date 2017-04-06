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

import { makeDefaultFrontendConnections } from '../model';
import FrontendConnectionsModelActions from '../actions/frontend-connections-model-actions';
import FrontendConnectionModel from '../model/frontend-connection-model';
import FrontendClientMetaDataModel from '../model/frontend-client-meta-data-model';

function addFrontendConnection(state, { payload: { frontendConnId, clientMetaData } }) {
  return state.set(frontendConnId, new FrontendConnectionModel({
    clientMetaData: new FrontendClientMetaDataModel({
      runnerConnId: clientMetaData.runnerConnId,
      winId: clientMetaData.winId,
    }),
  }));
}

function removeFrontendConnection(state, { payload: { frontendConnId } }) {
  return state.delete(frontendConnId);
}

export default handleActions({
  [FrontendConnectionsModelActions.addFrontendConnection]: addFrontendConnection,
  [FrontendConnectionsModelActions.removeFrontendConnection]: removeFrontendConnection,
}, makeDefaultFrontendConnections());
