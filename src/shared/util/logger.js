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
import df from 'dateformat';

export default class Logger {
  constructor(name, writer, options = {}) {
    this._name = name;
    this._writer = writer;
    this._options = options;
  }

  log(...args) {
    if (!this._options.always && process.env.LOGGING !== 'on') {
      return;
    }
    this._writer.log(df(Date.now(), '[HH:MM:ss:l]'), colors.bold(this._name), ...args);
  }
}
