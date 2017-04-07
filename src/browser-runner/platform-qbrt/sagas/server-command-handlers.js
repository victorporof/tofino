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

import { takeEvery, call } from 'redux-saga/effects';
import { spawn } from '../../../shared/util/spawn';
import * as Paths from '../../../shared/paths';

import logger from '../../logger';

import SharedActions from '../../../shared/actions/shared-actions';

function* create({ meta: client, payload: { winId, url } }) {
  logger.log(`Chrome frontend hosted at ${url}`);
  const qbrt = process.platform === 'win32'
    ? 'qbrt.cmd'
    : 'qbrt';
  spawn(qbrt, 'run', [Paths.QBRT_RUNNER_SHELL_DST, `${url}`], { logger });
  yield call([client, client.send], SharedActions.events.fromRunner.toServer.app.window.created({ winId }));
}

export default function* () {
  yield [
    takeEvery(SharedActions.commands.fromServer.toRunner.app.window.create, create),
  ];
}