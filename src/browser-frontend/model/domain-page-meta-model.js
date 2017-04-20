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

import Immutable from 'immutable';

const UNKNOWN_TITLE = '';
const UNKNOWN_FAVICON = '';

const LOAD_STATES = {
  INITIAL: 'initial',
  CONNECTING: 'connecting',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

const DomainPageMetaModel = Immutable.Record({
  loadState: LOAD_STATES.INITIAL,
  title: UNKNOWN_TITLE,
  favicon: UNKNOWN_FAVICON,
  bookmarked: false,
  tabOwner: null,
});

DomainPageMetaModel.UNKNOWN_TITLE = UNKNOWN_TITLE;
DomainPageMetaModel.UNKNOWN_FAVICON = UNKNOWN_FAVICON;
DomainPageMetaModel.LOAD_STATES = LOAD_STATES;

export default DomainPageMetaModel;
