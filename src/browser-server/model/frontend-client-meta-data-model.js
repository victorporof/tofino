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

import Immutable from 'immutable';

export default class FrontendClientMetaDataModel extends Immutable.Record({
  runnerConnId: null,
  winId: null,
}) {
  constructor(properties) {
    if (!properties || !properties.runnerConnId || !properties.winId) {
      throw new Error('Required properties missing from frontend client metadata constructor.');
    }
    super(properties);
  }
}
