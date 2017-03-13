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
import { createAction } from 'redux-actions';

export default class Connection {
  constructor({ server, pipe, store, logger }) {
    this._server = server;
    this._pipe = pipe;
    this._store = store;
    this._logger = logger;
  }

  listen() {
    this._pipe.on('message', (msg) => {
      const { type, payload } = JSON.parse(msg);
      this._logger.log(colors.green('⇠'), colors.cyan(msg));
      this._store.dispatch(createAction(type, () => payload, () => this)());
    });
  }

  send(msg) {
    const str = JSON.stringify(msg);
    this._pipe.emit('message', str);
    this._logger.log(colors.green('⇢'), colors.blue(str));
  }

  get id() {
    return this._pipe.id;
  }
}
