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

import Styles from './static-doorhanger.css';
import Tooltip from './tooltip';
import CSSArrow from './css-arrow';
import { shouldComponentWithPlainJsPropsUpdate } from './helpers/should-component-update';

/**
 * Static doorhangers are tooltips with certain visual UI elements surrounding
 * their children (such as arrows pointing towards an anchor, some background
 * and box shadows underneath the children etc.).
 */

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class StaticDoorhanger extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentWithPlainJsPropsUpdate.bind(this);
  }

  render() {
    return (
      <Tooltip
        styleName={`doorhanger \
          ${'left' in this.props.position ? 'relative-to-viewport-left' : 'relative-to-viewport-right'} \
          ${'top' in this.props.position ? 'relative-to-viewport-top' : 'relative-to-viewport-bottom'} \
          ${this.props.show ? 'expanded' : 'collapsed'}`}
        className={this.props.className}
        position={{
          ...('left' in this.props.position
            ? { left: this.props.position.left - this.props.arrowWidthPx
              - (this.props.arrowHorizontalOffsetPx - this.props.horizontalOffsetPx) }
            : { right: this.props.position.right - this.props.arrowWidthPx
              - (this.props.arrowHorizontalOffsetPx + this.props.horizontalOffsetPx) }),
          ...('top' in this.props.position
            ? { top: this.props.position.top + this.props.verticalOffsetPx }
            : { bottom: this.props.position.bottom - this.props.verticalOffsetPx }),
        }}
      >
        {/* FIXME: Use a proper SVG arrow for doorhangers. */}
        <CSSArrow
          width={`${this.props.arrowWidthPx}px`}
          height={`${this.props.arrowHeightPx}px`}
          point={'top' in this.props.position ? 'up' : 'down'}
          color="var(--theme-doorhanger-border-color)"
          styleName="arrow"
          style={{
            ...('left' in this.props.position
              ? { left: this.props.arrowHorizontalOffsetPx }
              : { right: this.props.arrowHorizontalOffsetPx }),
            ...('top' in this.props.position
              ? { top: 0 }
              : { bottom: 0 }),
          }}
        />
        <div
          styleName="contents"
          style={{
            ...('top' in this.props.position
              ? { marginTop: this.props.arrowHeightPx }
              : { marginBottom: this.props.arrowHeightPx }),
          }}
        >
          {this.props.children}
        </div>
      </Tooltip>
    );
  }
}

StaticDoorhanger.propTypes = {
  show: PropTypes.bool.isRequired,
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
  arrowWidthPx: PropTypes.number,
  arrowHeightPx: PropTypes.number,
  arrowHorizontalOffsetPx: PropTypes.number,
  horizontalOffsetPx: PropTypes.number,
  verticalOffsetPx: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

StaticDoorhanger.defaultProps = {
  className: '',
  arrowWidthPx: 11,
  arrowHeightPx: 11,
  arrowHorizontalOffsetPx: 6,
  horizontalOffsetPx: 0,
  verticalOffsetPx: 0,
  children: [],
};
