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

import serverEventHandlers from './server-event-handlers';
import webContentsEventHandlers from './webcontents-event-handlers';
import webContentsCommandHandlers from './webcontents-command-handlers';
import pagesCommandHandlers from './pages-command-handlers';
import profileCommandHandlers from './profile-command-handlers';
import developerCommandHandlers from './developer-command-handlers';
import keyboardShortcutsCommandHandlers from './keyboard-shortcuts-command-handlers';

export default function* () {
  yield [
    serverEventHandlers(),
    webContentsEventHandlers(),
    webContentsCommandHandlers(),
    pagesCommandHandlers(),
    profileCommandHandlers(),
    developerCommandHandlers(),
    keyboardShortcutsCommandHandlers(),
  ];
}
