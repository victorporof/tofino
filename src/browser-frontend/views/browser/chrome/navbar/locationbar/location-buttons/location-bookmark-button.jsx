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
import { connect } from 'react-redux';

import PagesModelActions from '../../../../../../actions/pages-model-actions';
import ProfileActions from '../../../../../../actions/profile-actions';
import * as DomainPagesSelectors from '../../../../../../selectors/domain-pages-selectors';

import ImageButton from '../../../../../../../shared/widgets/image-button';

@connect((state, ownProps) => ({
  bookmarked: DomainPagesSelectors.getPageBookmarkedState(state, ownProps.pageId),
}))
export default class LocationBookmarkButton extends PureComponent {
  handleClick = () => {
    if (this.props.bookmarked) {
      this.props.dispatch(PagesModelActions.setPageUnbookmarked({ pageId: this.props.pageId }));
      this.props.dispatch(ProfileActions.notifyPageUnstarred({ pageId: this.props.pageId }));
    } else {
      this.props.dispatch(PagesModelActions.setPageBookmarked({ pageId: this.props.pageId }));
      this.props.dispatch(ProfileActions.notifyPageStarred({ pageId: this.props.pageId }));
    }
  }

  render() {
    return (
      <ImageButton
        title="Bookmark"
        onClick={this.handleClick}
        src={this.props.bookmarked
            ? 'var(--theme-locationbar-unbookmark-button-image)'
            : 'var(--theme-locationbar-bookmark-button-image)'}
        width="16px"
        height="16px"
      />
    );
  }
}

LocationBookmarkButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  bookmarked: PropTypes.bool.isRequired,
};
