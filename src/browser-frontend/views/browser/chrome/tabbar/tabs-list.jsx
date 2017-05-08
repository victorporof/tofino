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

  findDragPosition = (event) => {
    let i = 0;
    let tabList = document.querySelectorAll('a[dragging=true]'); //Do not use tab index, they all eq 0. just to get all the tabs
    while (i < tabList.length) {
      let tab = tabList[i]
      if ((tab.offsetLeft + (tab.offsetWidth / 2)) >= event.clientX) {
        return i // tab position in tab list
      }
      i++;
    }
  }

  dragOver = (event) => {
    event.preventDefault();

    let pageId = this.props.draggingTabId;
    let oldPosition = this.props.pageIds.indexOf(pageId);
    let newPosition = this.findDragPosition(event);

    if (oldPosition !== newPosition) {
      this.props.dispatch(PagesModelActions.tabbar.moveTabTo({ pageId, newPosition, oldPosition}));
    };
  }

  drop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let pageId = this.props.draggingTabId;
    let oldPosition = this.props.pageIds.indexOf(pageId);
    let newPosition = this.findDragPosition(event);
    this.props.dispatch(PagesModelActions.tabbar.moveTabTo({ pageId, newPosition, oldPosition}));
    this.props.dispatch(PagesModelActions.tabbar.setDraggingTab({ pageId: '' }))
  }

  render() {
    return (
      <div styleName="tabs-list"
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDrop={this.drop}>
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
  dispatch: PropTypes.func.isRequired,
  draggingTabId: PropTypes.string.isRequired,
  pageIds: SharedPropTypes.PageIds.isRequired,
};
