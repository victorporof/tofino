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
import FontAwesome from 'react-fontawesome';

import * as UIPagesSelectors from '../../../../../selectors/ui-pages-selectors';
import * as DomainPagesSelectors from '../../../../../selectors/domain-pages-selectors';
import DomainPageTransientModel from '../../../../../model/domain-page-transient-model';

import Styles from './tab-favicon.css';
import FittedImage from '../../../../../../shared/widgets/fitted-image';

@connect((state, ownProps) => ({
  loadState: DomainPagesSelectors.getPageLoadState(state, ownProps.pageId),
  faviconCssUrl: UIPagesSelectors.getComputedPageFaviconCssUrl(state, ownProps.pageId),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabFavicon extends PureComponent {
  render() {
    let contents;

    if (this.props.loadState === DomainPageTransientModel.LOAD_STATES.INITIAL ||
        this.props.loadState === DomainPageTransientModel.LOAD_STATES.CONNECTING) {
      contents = (<FittedImage
        src="var(--theme-tab-connecting)"
        width="28px"
        height="16px"
        mode="contain"
      />);
    } else if (this.props.loadState === DomainPageTransientModel.LOAD_STATES.LOADING) {
      contents = (<FittedImage
        src="var(--theme-tab-loading)"
        width="28px"
        height="16px"
        mode="contain"
      />);
    } else if (this.props.loadState === DomainPageTransientModel.LOAD_STATES.LOADED) {
      if (this.props.faviconCssUrl !== undefined) {
        contents = (<FittedImage
          src={this.props.faviconCssUrl}
          width="16px"
          height="16px"
          styleName="img-icon"
        />);
      } else {
        contents = (<FontAwesome
          name="globe"
          styleName="fa-icon"
        />);
      }
    } else {
      contents = (<FontAwesome
        name="exclamation-triangle"
        styleName="fa-icon"
      />);
    }

    return (
      <div styleName="tab-favicon">
        {contents}
      </div>
    );
  }
}

TabFavicon.WrappedComponent.propTypes = {
  pageId: PropTypes.string.isRequired, // eslint-disable-line
  loadState: PropTypes.string.isRequired,
  faviconCssUrl: PropTypes.string,
};

TabFavicon.WrappedComponent.defaultProps = {
  faviconCssUrl: undefined,
};
