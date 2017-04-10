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

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import Styles from './tooltip.css';
import { shouldComponentWithPlainJsPropsUpdate } from './helpers/should-component-update';

/**
 * Tooltips are fixed positioned elements at specified locations, which display
 * on top of any other element. The location can be relative to any corner in
 * the viewport. They can contain any children.
 */

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentWithPlainJsPropsUpdate.bind(this);
  }

  render() {
    return (
      <div
        className={this.props.className}
        styleName="tooltip"
        style={{ ...this.props.position }}
      >
        {this.props.children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOfType([
    PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      right: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      left: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      right: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Tooltip.defaultProps = {
  className: '',
  children: [],
};
