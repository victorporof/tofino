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

import throttle from 'lodash/throttle';

import logger from './logger';

import { configureStore } from '../shared/store/configure';
import * as Endpoints from './constants/endpoints';
import Client from '../shared/util/client';
import RootReducer from './reducers/root-reducer';
import RootSaga from './sagas/root-saga';

export const store = configureStore({ reducers: RootReducer, sagas: RootSaga, throttle: fn => throttle(fn, 1) });
export const client = new Client({ endpoint: Endpoints.SERVER_WS_ROUTE, store, logger });
