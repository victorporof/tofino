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

import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import * as SharedPropTypes from '../../../../model/shared-prop-types';
import * as UIPagesSelectors from '../../../../selectors/ui-pages-selectors';

import Styles from './tabs-list.css';
import Tab from './tab';

@connect(state => ({
  pageIds: UIPagesSelectors.getPageIdsInDisplayOrder(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabsList extends PureComponent {
  render() {
    return (
      <div styleName="tabs-list">
        {this.props.pageIds.map(pageId => (
          <Tab
            key={pageId}
            pageId={pageId}
          />
        ))}
      </div>
    );
  }
}

TabsList.WrappedComponent.propTypes = {
  pageIds: SharedPropTypes.PageIds.isRequired,
};
