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
import Styles from './spinner.css';

const BKG_MODE_DEFAULT = 'cover';
const BKG_REPEAT_DEFAULT = 'no-repeat';
const BKG_POSIITON_DEFAULT = 'center';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Spinner extends WidgetComponent {
  render() {
    return (
      <div
        className={this.props.className}
        name="spinner"
        style={{
          ...this.props.style,
          width: this.props.width,
          height: this.props.height,
          backgroundImage: this.props.src,
          backgroundSize: this.props.mode,
          backgroundRepeat: this.props.repeat,
          backgroundPosition: this.props.position,
        }}
      />
    );
  }
}

Spinner.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  mode: PropTypes.oneOf(['cover', 'contain']),
  repeat: PropTypes.string,
  position: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
  style: {},
  mode: BKG_MODE_DEFAULT,
  repeat: BKG_REPEAT_DEFAULT,
  position: BKG_POSIITON_DEFAULT,
};
