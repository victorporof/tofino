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

import DomainPageMetaModel from './domain-page-meta-model';

export default class DomainPageModel extends Immutable.Record({
  id: null,
  url: null,
  meta: new DomainPageMetaModel(),
}) {
  constructor(properties) {
    if (!properties || !properties.id || !properties.url) {
      throw new Error('Required properties missing from page constructor.');
    }
    super(properties);
  }
}
