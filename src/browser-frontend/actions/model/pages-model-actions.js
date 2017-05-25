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
  ADD_PAGE: identity,
  REMOVE_PAGE: identity,
  RESET_PAGE_DATA: identity,
  SET_PAGE_URL: identity,
  SET_PAGE_LOAD_STATE: identity,
  SET_PAGE_TITLE: identity,
  SET_PAGE_FAVICONS: identity,
  SET_PAGE_BOOKMARKED: identity,
  SET_PAGE_UNBOOKMARKED: identity,
  SET_SELECTED_PAGE: identity,
  TABBAR: {
    SET_TAB_STATE: identity,
    SET_ALL_TAB_ANIMATIONS_ENABLED: identity,
    SET_ALL_TAB_ANIMATIONS_DISABLED: identity,
    SET_TAB_LOADED_ANIMATION_ENABLED: identity,
    SET_TAB_LOADED_ANIMATION_DISABLED: identity,
    CHANGE_DISPLAY_ORDER: identity,
  },
  NAVBAR: {
    SET_LOCATION_INPUT_BAR_VALUE: identity,
    SET_BACK_BUTTON_ENABLED: identity,
    SET_BACK_BUTTON_DISABLED: identity,
    SET_FORWARD_BUTTON_ENABLED: identity,
    SET_FORWARD_BUTTON_DISABLED: identity,
    SET_RELOAD_BUTTON_ENABLED: identity,
    SET_RELOAD_BUTTON_DISABLED: identity,
  },
});
