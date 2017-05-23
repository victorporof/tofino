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

import Styles from './new-tab-button.css';
import AnimatedImageButton from '../../../../../shared/widgets/animated-image-button';

@connect(() => ({
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class NewTabButton extends PureComponent {
  handleClick = () => {
    this.props.dispatch(PagesModelActions.addPage());
  }

  render() {
    return (
      <AnimatedImageButton
        title="New Tab"
        styleName="new-tab-button"
        onClick={this.handleClick}
        src="var(--theme-new-tab-button-image)"
        width="12px"
        height="12px"
        imageStyle={Styles.icon}
      />
    );
  }
}

NewTabButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
