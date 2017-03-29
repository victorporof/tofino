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

import { handleActions } from 'redux-actions';

import Model from '../model';
import PagesModelActions from '../actions/pages-model-actions';

function setLocationInputBarValue(state, { payload: { pageId, value } }) {
  return state.setIn(['ui', 'pages', 'visuals', pageId, 'locationInputBarValue'], value);
}

export default handleActions({
  [PagesModelActions.navbar.setLocationInputBarValue]: setLocationInputBarValue,
}, new Model());
