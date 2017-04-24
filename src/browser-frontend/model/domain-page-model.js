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
import isUUID from 'is-uuid';

import DomainPageTransientModel from './domain-page-transient-model';

export default class DomainPageModel extends Immutable.Record({
  id: null,
  ownerId: null,
  url: null,
  transient: new DomainPageTransientModel(),
}) {
  constructor(properties) {
    if (!properties || !properties.id || !properties.url) {
      throw new Error('Required properties missing from page constructor.');
    }
    if (!isUUID.v4(properties.id)) {
      throw new Error('Malformed page id');
    }
    super(properties);
  }
}
