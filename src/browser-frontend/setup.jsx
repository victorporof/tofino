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

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import * as Meta from './constants/meta';
import SharedActions from '../shared/actions/shared-actions';
import PagesModelActions from './actions/pages-model-actions';
import Window from './views/browser/window';

export const setupWs = async (client) => {
  await client.listen();
  await client.send(SharedActions.events.fromFrontend.toServer.client.hello({
    clientMetaData: {
      runnerConnId: Meta.RUNNER_CONN_ID,
      winId: Meta.WIN_ID,
    },
  }));
};

export const setupFrontend = (store, document, selector) => {
  const container = document.querySelector(selector);
  const app = (
    <AppContainer>
      <Provider store={store}>
        <Window />
      </Provider>
    </AppContainer>
  );
  ReactDOM.render(app, container);
};

export const setupInitialState = (store) => {
  store.dispatch(PagesModelActions.addPage());
};
