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

import WebContents from '../../shared/widgets/web-contents';
import WebContentsActions from '../actions/webcontents-actions';

function* navigatePageTo({ payload: { pageId, url } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.navigateTo, url);
}

function* navigatePageBack({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.goBack);
}

function* navigatePageForward({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.goForward);
}

function* navigatePageRefresh({ payload: { pageId } }) {
  const webContents = WebContents.getWebContentsWithId(pageId);
  yield call(webContents.impl.reload);
}

export default function* () {
  yield [
    takeEvery(WebContentsActions.commands.navigatePageTo, navigatePageTo),
    takeEvery(WebContentsActions.commands.navigatePageBack, navigatePageBack),
    takeEvery(WebContentsActions.commands.navigatePageForward, navigatePageForward),
    takeEvery(WebContentsActions.commands.navigatePageRefresh, navigatePageRefresh),
  ];
}
