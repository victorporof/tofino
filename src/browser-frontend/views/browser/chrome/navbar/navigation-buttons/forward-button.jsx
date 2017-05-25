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

import WebContentsEffects from '../../../../../actions/effects/webcontents-effects';
import * as UIPagesSelectors from '../../../../../selectors/ui-pages-selectors';

import Styles from './forward-button.css';
import AnimatedImageButton from '../../../../../../shared/widgets/animated-image-button';

@connect((state, ownProps) => ({
  disabled: !UIPagesSelectors.getPageForwardButtonEnabled(state, ownProps.pageId),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class ForwardButton extends PureComponent {
  handleClick = () => {
    this.props.dispatch(WebContentsEffects.commands.navigatePageForward({
      pageId: this.props.pageId,
    }));
  }

  render() {
    return (
      <AnimatedImageButton
        title="Forward"
        styleName="forward-button"
        disabled={this.props.disabled}
        onClick={this.handleClick}
        src="var(--theme-forward-button-image)"
        width="16px"
        height="16px"
      />
    );
  }
}

ForwardButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
