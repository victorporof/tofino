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

import WebContentsActions from '../../../../../actions/webcontents-actions';

import Styles from './back-button.css';
import Button from '../../../../../../shared/widgets/button';
import FittedImage from '../../../../../../shared/widgets/fitted-image';

@connect(() => ({
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class BackButton extends PureComponent {
  handleClick = () => {
    this.props.dispatch(WebContentsActions.commands.navigatePageBack({
      pageId: this.props.pageId,
    }));
  }

  render() {
    return (
      <Button
        title="Back"
        styleName="back-button"
        onClick={this.handleClick}
      >
        <FittedImage
          src="var(--theme-back-button-image)"
          width="16px"
          height="16px"
        />
      </Button>
    );
  }
}

BackButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
};
