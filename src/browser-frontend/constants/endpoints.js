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

import url from 'url';

export const SERVER_API_VERSION = location.pathname.match(/\/(v[0-9]+)\//).pop();
export const SERVER_HOSTNAME = location.hostname;
export const SERVER_PORT = location.port;

export const SERVER_WS_ROUTE = url.format({
  protocol: 'ws:',
  slashes: true,
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  pathname: `${SERVER_API_VERSION}/frontend`,
});

export const NEW_TAB_PAGE_URL = url.format({
  protocol: 'http:',
  slashes: true,
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  pathname: `${SERVER_API_VERSION}/chrome/new-tab`,
});

// FIXME
export const DEFAULT_PAGE_URL = 'https://www.mozilla.org/';
