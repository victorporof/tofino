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

export const HOSTNAME = location.hostname;
export const PORT = location.port;
export const VERSION = location.pathname.match(/\/(v[0-9]+)\//).pop();

export const WS_ROUTE = url.format({
  protocol: 'ws:',
  slashes: true,
  hostname: HOSTNAME,
  port: PORT,
  pathname: `${VERSION}/frontend`,
});
