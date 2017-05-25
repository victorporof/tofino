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

import { fixURL } from '../../../../../../shared/util/search';
import * as UIPagesSelectors from '../../../../../selectors/ui-pages-selectors';
import PagesModelActions from '../../../../../actions/model/pages-model-actions';
import WebContentsEffects from '../../../../../actions/effects/webcontents-effects';

import Styles from './location-inputbar.css';
import Input from '../../../../../../shared/widgets/input';

@connect((state, ownProps) => ({
  value: UIPagesSelectors.getPageLocationInputBarValue(state, ownProps.pageId),
  focused: UIPagesSelectors.getComputedLocationInputbarWantsFocus(state, ownProps.pageId),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class LocationInputBar extends PureComponent {
  handleChange = (e) => {
    this.props.dispatch(PagesModelActions.navbar.setLocationInputBarValue({
      pageId: this.props.pageId,
      value: e.target.value,
    }));
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.dispatch(WebContentsEffects.commands.navigatePageTo({
        pageId: this.props.pageId,
        url: fixURL(e.target.value),
      }));
    }
  }

  render() {
    return (
      <Input
        type="text"
        value={this.props.value}
        focused={this.props.focused}
        placeholder="Search or input website name"
        styleName="location-inputbar"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

LocationInputBar.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};
