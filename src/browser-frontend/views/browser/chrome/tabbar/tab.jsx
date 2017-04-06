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

import PagesModelActions from '../../../../actions/pages-model-actions';
import UIPageModel from '../../../../model/ui-page-model';
import * as UIPagesSelectors from '../../../../selectors/ui-pages-selectors';

import Styles from './tab.css';
import TabContents from './tab/tab-contents';

@connect((state, ownProps) => ({
  selected: UIPagesSelectors.getSelectedPageId(state) === ownProps.pageId,
  tooltipText: UIPagesSelectors.getComputedPageTooltipText(state, ownProps.pageId),
  tabState: UIPagesSelectors.getPageTabState(state, ownProps.pageId),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Tab extends PureComponent {
  componentDidMount() {
    this.props.dispatch(PagesModelActions.tabbar.setTabState({
      pageId: this.props.pageId,
      tabState: UIPageModel.TAB_STATES.OPEN,
    }));
  }

  handleClick = () => {
    this.props.dispatch(PagesModelActions.setSelectedPage({ pageId: this.props.pageId }));
  }

  render() {
    return (
      <a
        tabIndex={0}
        styleName={`tab ${this.props.selected ? 'selected' : 'deselected'} ${this.props.tabState}`}
        title={this.props.tooltipText}
        onClick={this.handleClick}
      >
        <TabContents pageId={this.props.pageId} />
      </a>
    );
  }
}

Tab.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string.isRequired,
  tabState: PropTypes.string.isRequired,
};
