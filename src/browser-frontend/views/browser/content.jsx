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

import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import * as SharedPropTypes from '../../model/shared-prop-types';
import * as UIPagesSelectors from '../../selectors/ui-pages-selectors';

import Styles from './content.css';
import NavBar from './chrome/navbar';
import Page from './chrome/page';

@connect(state => ({
  pageIds: UIPagesSelectors.getPageIdsInDisplayOrder(state),
  selectedPageId: UIPagesSelectors.getSelectedPageId(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Content extends PureComponent {
  render() {
    return (
      <div styleName="content">
        {this.props.pageIds.map(pageId => (
          <div
            key={pageId}
            styleName={`instance ${pageId === this.props.selectedPageId ? '' : 'inactive'}`}
          >
            <NavBar pageId={pageId} />
            <Page pageId={pageId} />
          </div>
        ))}
      </div>
    );
  }
}

Content.WrappedComponent.propTypes = {
  pageIds: SharedPropTypes.PageIds.isRequired,
  selectedPageId: PropTypes.string.isRequired,
};
