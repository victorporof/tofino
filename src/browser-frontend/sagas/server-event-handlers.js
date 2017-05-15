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

import { takeEvery, put } from 'redux-saga/effects';

import SharedActions from '../../shared/actions/shared-actions';
import KeyboardShortcutsEffects from '../actions/effects/keyboard-shortcuts-effects';

// Some keyboard shortcuts need to be registered at the platform level,
// because they clash with OS-level shortcuts (e.g. Cmd+W on macOS
// hides windows, but we want it to close tabs instead.). The platform
// is tasked with overriding these shortcuts and providing us control.
function* onKeyShortcutPressed({ payload: { shortcut } }) {
  if (shortcut.keys === 'CommandOrControl+Q') {
    yield put(KeyboardShortcutsEffects.commands.handleAccelQ());
  } else if (shortcut.keys === 'CommandOrControl+W') {
    yield put(KeyboardShortcutsEffects.commands.handleAccelW());
  }
}

export default function* () {
  yield [
    takeEvery(SharedActions.events.fromServer.toFrontend.app.window.keyShortcuts.pressed, onKeyShortcutPressed),
  ];
}
