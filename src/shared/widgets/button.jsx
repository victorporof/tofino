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
import identity from 'lodash/identity';

import WidgetComponent from './helpers/widget-component';
import Styles from './button.css';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Button extends WidgetComponent {
  render() {
    return (
      <button
        title={this.props.title}
        disabled={this.props.disabled}
        styleName={`button ${this.props.disabled ? 'disabled' : 'enabled'}`}
        className={this.props.className}
        onClick={this.props.disabled ? null : this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  disabled: false,
  className: '',
  onClick: identity,
  children: [],
};
