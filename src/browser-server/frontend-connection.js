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

import isUUID from 'is-uuid';

import Connection from './connection';

export default class FrontendConnection extends Connection {
  static _instancesByWinId = new Map()

  constructor(...args) {
    super(...args);
  }

  send(...args) {
    if (!isUUID.v4(this._frontendWinId)) {
      throw new Error('No associated frontend window for this connection.');
    }
    return super.send(...args);
  }

  setFrontendWinId(winId) {
    this._frontendWinId = winId;
    FrontendConnection._instancesByWinId.set(winId, this);
  }

  get frontendWinId() {
    return this._frontendWinId;
  }

  static getWithFrontendWinId(winId) {
    return FrontendConnection._instancesByWinId.get(winId);
  }
}
