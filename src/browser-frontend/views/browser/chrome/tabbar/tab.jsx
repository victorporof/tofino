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

import PagesModelActions from '../../../../actions/model/pages-model-actions';
import UIPageModel from '../../../../model/ui-page-model';
import * as UIPagesSelectors from '../../../../selectors/ui-pages-selectors';
import * as DomainPagesSelectors from '../../../../selectors/domain-pages-selectors';

import Styles from './tab.css';
import TabContents from './tab/tab-contents';
import PreloadImage from '../../../../../shared/widgets/preload-image';

@connect((state, ownProps) => ({
  selected: UIPagesSelectors.getSelectedPageId(state) === ownProps.pageId,
  tooltipText: UIPagesSelectors.getComputedPageTooltipText(state, ownProps.pageId),
  tabState: UIPagesSelectors.getPageTabState(state, ownProps.pageId),
  tabOwner: !!DomainPagesSelectors.getPageOwnerId(state, ownProps.pageId),
  tabAnimationsDisabled: UIPagesSelectors.getTabAnimationsDisabled(state, ownProps.pageId),
  tabLoadAnimationRunning: UIPagesSelectors.getTabLoadAnimationRunning(state, ownProps.pageId),
  tabLoadAnimationPlayCount: UIPagesSelectors.getTabLoadAnimationPlayCount(state, ownProps.pageId),
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
    const activeTabLoadAnimation =
      `url('assets/wipe-blue.gif?${this.props.pageId}-${this.props.tabLoadAnimationPlayCount}')`;
    const inactiveTabLoadAnimation =
      `url('assets/wipe-grey.gif?${this.props.pageId}-${this.props.tabLoadAnimationPlayCount}')`;
    return (
      <a
        tabIndex={0}
        styleName={`tab \
          ${this.props.selected ? 'selected' : ''} \
          ${this.props.tabState !== 'open' ? this.props.tabState : ''} \
          ${this.props.tabOwner ? 'has-owner' : ''} \
          ${this.props.tabAnimationsDisabled ? 'noanimate' : ''} \
          ${this.props.tabLoadAnimationRunning ? 'tab-loaded' : ''}`
        }
        title={this.props.tooltipText}
        onClick={this.handleClick}
        style={{
          ...(this.props.tabLoadAnimationRunning ? {
            ...(this.props.selected ? {
              backgroundImage: activeTabLoadAnimation,
            } : {
              backgroundImage: inactiveTabLoadAnimation,
            }),
          } : {}),
        }}
      >
        <PreloadImage src={activeTabLoadAnimation} />
        <PreloadImage src={inactiveTabLoadAnimation} />
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
  tabOwner: PropTypes.bool.isRequired,
  tabAnimationsDisabled: PropTypes.bool.isRequired,
  tabLoadAnimationRunning: PropTypes.bool.isRequired,
  tabLoadAnimationPlayCount: PropTypes.number.isRequired,
};
