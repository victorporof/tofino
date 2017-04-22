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

import { call, select } from 'redux-saga/effects';
import querystring from 'querystring';
import uuid from 'uuid/v4';

import { BROWSER_SHARED_DST } from '../../shared/paths';
import { CHROME_URL } from '../constants/endpoints';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants/browser-window-defaults';

import SharedActions from '../../shared/actions/shared-actions';
import * as RunnerConnectionsSelectors from '../selectors/runner-connections-selectors';

export function* createWindow({ meta: runnerConn }) {
  const runnerConnId = runnerConn.id;
  const { os, platform } = yield select(RunnerConnectionsSelectors.getRunnerClientMetaData, runnerConnId);

  const winId = uuid();
  const frontendParams = querystring.stringify({ runnerConnId, winId, os, platform });

  // Some browser runners want icons even when packaged. For example, electron
  // needs an icon on Linux when creating browser windows:
  // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#icon
  let icon;
  if (os === 'win32') {
    icon = `${BROWSER_SHARED_DST}\\branding\\app-icon.ico`;
  } else if (os === 'linux') {
    icon = `${BROWSER_SHARED_DST}/branding/app-icon.ico`;
  } else if (os === 'darwin') {
    icon = `${BROWSER_SHARED_DST}/branding/app-icon.icns`;
  }

  yield call([runnerConn, runnerConn.send], SharedActions.commands.fromServer.toRunner.app.window.create({
    winId,
    icon,
    url: `${CHROME_URL}?${frontendParams}`,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    style: os === 'darwin' ? 'onlyTitleBarHiddenAndWindowControlsInset' : 'chromeless',
  }));
}
