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

import path from 'path';

import logger from './logger';

import { spawn } from '../shared/util/spawn';
import * as Endpoints from './constants/endpoints';
import * as Paths from '../shared/paths';

export const serve = async () => {
  const args = [
    '--hostname', Endpoints.SERVER_HOSTNAME,
    '--port', await Endpoints.SERVER_PORT_PROMISE,
  ];

  const command = path.join(Paths.ROOT_DIR, 'node');
  const main = Paths.BROWSER_SERVER_DST_MAIN;
  return spawn(command, main, args, { logger });
};
