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

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import WidgetComponent from './helpers/widget-component';
import Styles from './image-button.css';
import Button from './button';
import FittedImage from './fitted-image';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class ImageButton extends WidgetComponent {
  render() {
    return (
      <Button
        title={this.props.title}
        className={`${this.props.className} ${Styles.button}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <FittedImage
          src={this.props.src}
          width={this.props.width}
          height={this.props.height}
          className={`${this.props.imageStyle} ${Styles['fitted-image']}`}
        />
      </Button>
    );
  }
}

ImageButton.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  imageStyle: PropTypes.string,
};
