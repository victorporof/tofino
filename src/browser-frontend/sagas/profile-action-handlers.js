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

import { takeEvery, call, select } from 'redux-saga/effects';

import { client } from '../global';
import ProfileActions from '../actions/profile-actions';
import SharedActions from '../../shared/actions/shared-actions';
import * as DomainPagesSelectors from '../selectors/domain-pages-selectors';

function* notifyPageVisited({ payload: { pageId } }) {
  yield call([client, client.send], SharedActions.events.fromFrontend.toServer.app.page.visited({
    url: yield select(DomainPagesSelectors.getPageUrl, pageId),
    title: yield select(DomainPagesSelectors.getPageTitle, pageId),
    favicons: yield select(DomainPagesSelectors.getPageFavicons, pageId),
  }));
}

export default function* () {
  yield [
    takeEvery(ProfileActions.notifyPageVisited, notifyPageVisited),
  ];
}
