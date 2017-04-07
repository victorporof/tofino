/* Copyright 2017 Mozilla
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. */

'use strict';

const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu } = Components;
const { Runtime } = Cu.import('resource://qbrt/modules/Runtime.jsm', {});
const { Services } = Cu.import('resource://gre/modules/Services.jsm', {});


// TODO: Pass correct values as command line arguments to qbrt
const searchParams = [
  'runnerConnId=%2Fv1%2Frunner%23k4cFvGGdjECa9trEAAAB',
  'winId=2d12c846-3712-411b-8efb-f810683aa3ac',
  'os=darwin',
  'platform=qbrt',
  'apiVersion=v1',
  'hostname=localhost',
  'port=9000',
].join('&');
const SHELL_URL = `chrome://app/content/index.html?${searchParams}`;

const WINDOW_FEATURES = [
  'width=640',
  'height=480',
  'resizable',
  'scrollbars',
].join(',');

// On startup, activate ourselves, since starting up from Node doesn't do this.
// TODO: do this by default for all apps started via Node.
if (Services.appinfo.OS === 'Darwin') {
  Cc['@mozilla.org/widget/macdocksupport;1'].getService(Ci.nsIMacDockSupport).activateApplication(true);
}

// TODO: Find a way to pass the correct browser-frontend URL down to this process
const url = Runtime.commandLineArgs[0] || Runtime.packageJSON.mainURL || 'index.html';
const argument = Cc['@mozilla.org/supports-string;1'].createInstance(Ci.nsISupportsString);
argument.data = url;

// TODO: report error if URL isn't found.
let win = Services.ww.openWindow(null, SHELL_URL, '_blank', WINDOW_FEATURES, argument);

Runtime.openDevTools(win);
