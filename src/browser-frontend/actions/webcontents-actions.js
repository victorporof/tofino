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

import { createActions } from 'redux-actions';
import identity from 'lodash/identity';

export default createActions({
  COMMANDS: {
    NAVIGATE_PAGE_TO: identity,
    NAVIGATE_PAGE_BACK: identity,
    NAVIGATE_PAGE_FORWARD: identity,
    NAVIGATE_PAGE_REFRESH: identity,
  },
  EVENTS: {
    PAGE_DID_MOUNT: identity,
    PAGE_DID_START_LOADING: identity,
    PAGE_DID_STOP_LOADING: identity,
    PAGE_DID_SUCCEED_LOAD: identity,
    PAGE_DID_FAIL_LOAD: identity,
    PAGE_TITLE_SET: identity,
    PAGE_FAVICONS_SET: identity,
    PAGE_DID_NAVIGATE: identity,
    PAGE_DID_NAVIGATE_INTERNAL: identity,
    PAGE_DID_NAVIGATE_TO_NEW_WINDOW: identity,
  },
});
