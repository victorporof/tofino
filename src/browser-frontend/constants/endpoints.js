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
import querystring from 'querystring';

// Support loading a file over chrome URI for qbrt by allowing these to be passed
// as search params. Don't use `URLSearchParams` because this file may end up
// loaded in a mocha test environment, failing even with `jsdom` globals.

const QUERY = querystring.parse(url.parse(location.href).query);

export const SERVER_API_VERSION = QUERY.apiVersion || location.pathname.split('/')[1];
export const SERVER_HOSTNAME = QUERY.hostname || location.hostname;
export const SERVER_PORT = QUERY.port || location.port;

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
export const DEFAULT_PAGE_URL = 'https://duckduckgo.com/';
