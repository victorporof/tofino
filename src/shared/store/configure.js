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

import isBrowser from 'is-browser';
import { createStore, applyMiddleware, compose } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

function identityReducer(arg) { return arg; }
function* identitySaga(arg) { yield arg; }

export const configureStore = ({ reducers = identityReducer, sagas = identitySaga, middleware = [] } = {}) => {
  middleware.push(thunk);

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  if (isBrowser && process.env.LOGGING === 'on') {
    middleware.push(createLogger({
      collapsed: true,
      stateTransformer: state => state.toJS(),
    }));
  }

  const enhancer = compose(
    applyMiddleware(...middleware),
    batchedSubscribe(notify => notify()),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(sagas);

  return store;
};
