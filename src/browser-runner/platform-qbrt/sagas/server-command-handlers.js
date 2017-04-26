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
import { parse } from 'url';
import querystring from 'querystring';

import logger from '../../logger';

import { spawn } from '../../../shared/util/spawn';
import * as Paths from '../../../shared/paths';
import SharedActions from '../../../shared/actions/shared-actions';

function* create({ meta: client, payload: { winId, url, width, height, style } }) {
  logger.log(`Chrome frontend hosted at ${url}`);

  const qbrt = process.platform === 'win32'
    ? 'qbrt.cmd'
    : 'qbrt';

  // Normally these parameters are inferred from the url in the frontend, but when
  // running in qbrt the frontend is loaded as a chrome:// url so we need to tack
  // these on as get parameters
  const parsedURL = parse(url);
  const extraParams = querystring.stringify({
    port: parsedURL.port,
    hostname: parsedURL.hostname,
    apiVersion: parsedURL.pathname.split('/')[1],
  });
  const searchParams = `${parsedURL.search}&${extraParams}`;
  const args = [Paths.QBRT_RUNNER_SHELL_DST,
    '--width', width,
    '--height', height,
    '--style', style,
    '--searchParams', searchParams,
  ];

  // TODO: Pass important params (server version, hostname, port, etc) along as
  // args once https://github.com/mozilla/qbrt/pull/51 lands
  spawn(qbrt, 'run', args, { logger });
  yield call([client, client.send], SharedActions.events.fromRunner.toServer.app.window.created({ winId }));
}

export default function* () {
  yield [
    takeEvery(SharedActions.commands.fromServer.toRunner.app.window.create, create),
  ];
}
