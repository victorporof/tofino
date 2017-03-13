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

import yargs from 'yargs';

export const VERSION = yargs.argv.version;
export const HOSTNAME = yargs.argv.hostname;
export const PORT = yargs.argv.port;

export const CHROME_ROUTE = `/${VERSION}/chrome`;
export const BROWSER_RUNNER_WS_ROUTE = `/${VERSION}/runner`;
export const BROWSER_FRONTEND_WS_ROUTE = `/${VERSION}/frontend`;

export const CHROME_URL = url.format({
  protocol: 'http:',
  slashes: true,
  hostname: yargs.argv.hostname,
  port: yargs.argv.port,
  pathname: `${yargs.argv.version}/chrome`,
});
