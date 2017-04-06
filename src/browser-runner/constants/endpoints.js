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
import portastic from 'portastic';

export const USING_EXTERNAL_SERVER = yargs.argv.useExternalServer;

export const VERSION = (() => {
  if (USING_EXTERNAL_SERVER) {
    return yargs.argv.version;
  }
  return 'v1';
})();

export const HOSTNAME = (() => {
  if (USING_EXTERNAL_SERVER) {
    return yargs.argv.hostname;
  }
  return 'localhost';
})();

export const PORT_PROMISE = (async () => {
  if (USING_EXTERNAL_SERVER) {
    return yargs.argv.port;
  }
  const PORT_RANGE = {
    min: 9000,
    max: 9999,
  };
  const ports = await portastic.find(PORT_RANGE);
  if (ports.length === 0) {
    throw new Error('Couldn\'t find any open ports.');
  }
  return ports[0];
})();


export const WS_ROUTE_PROMISE = (async () => url.format({
  protocol: 'ws:',
  slashes: true,
  hostname: HOSTNAME,
  port: await PORT_PROMISE,
  pathname: `${VERSION}/runner`,
}))();
