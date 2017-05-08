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

import * as SharedPropTypes from '../../../../model/shared-prop-types';
import * as UIPagesSelectors from '../../../../selectors/ui-pages-selectors';
import PagesModelActions from '../../../../actions/pages-model-actions';

import Styles from './tabs-list.css';
import Tab from './tab';
import FlipMove from 'react-flip-move';

@connect(state => ({
  draggingTabId: UIPagesSelectors.getDraggingTabId(state),
  pageIds: UIPagesSelectors.getPageIdsInDisplayOrder(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabsList extends PureComponent {

  dragEnter = (event) => {
  }

  findDragPosition = (event, currentPosition) => {
    let i = 0;
    let tabList = document.querySelectorAll('a'); //need to be able to select tabs not just by `a`
    while (i < tabList.length) {
      let tab_rect = tabList[i].getBoundingClientRect();
      if (i < currentPosition) {
        if ((tab_rect.left + (tab_rect.width / 2)) >= event.clientX) {
          return i;
        }
      } else if (i > currentPosition) {
        if ((tab_rect.left + (tab_rect.width / 2)) <= event.clientX) {
          return i;
        }
      }
      i++;
    }
    return currentPosition;
  }

  dragOver = (event) => {
    event.preventDefault();

    let pageId = this.props.draggingTabId;
    let currentPosition = this.props.pageIds.indexOf(pageId);
    let newPosition = this.findDragPosition(event, currentPosition);
    if (currentPosition !== newPosition) {
      this.props.dispatch(PagesModelActions.tabbar.moveTabTo({ pageId, newPosition, currentPosition}));
    };
  }

  drop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let pageId = this.props.draggingTabId;
    let currentPosition = this.props.pageIds.indexOf(pageId);
    let newPosition = this.findDragPosition(event, currentPosition);
    if (currentPosition !== newPosition) {
      this.props.dispatch(PagesModelActions.tabbar.moveTabTo({ pageId, newPosition, currentPosition}));
    }
    this.props.dispatch(PagesModelActions.tabbar.setDraggingTab({ pageId: '' }))
  }

  render() {
    return (
      <FlipMove
        // disableAllAnimations={true}
        appearAnimation="none"
        enterAnimation="none"
        leaveAnimation="none"
        easing="cubic-bezier(0.07, 0.95, 0, 1)"
        duration="200"
        styleName="tabs-list"
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDrop={this.drop}>
        {this.props.pageIds.map(pageId => (
          <Tab
            key={pageId}
            pageId={pageId}
          />
        ))}
      </FlipMove>
    );
  }
}

TabsList.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  draggingTabId: PropTypes.string.isRequired,
  pageIds: SharedPropTypes.PageIds.isRequired,
};
