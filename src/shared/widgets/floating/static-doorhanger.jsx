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

import WidgetComponent from '../helpers/widget-component';
import Styles from './static-doorhanger.css';
import Tooltip from './tooltip';
import FittedImage from '../fitted-image';

/**
 * Static doorhangers are tooltips with certain visual UI elements surrounding
 * their children (such as arrows, background and shadow etc.).
 */

const ARROW_WIDTH_PX = 24;
const ARROW_HEIGHT_PX = 12;
const ARROW_HORIZONTAL_OFFSET_PX = 6;

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class StaticDoorhanger extends WidgetComponent {
  constructor(...args) {
    super(...args);
  }

  setTooltipRef = (e) => {
    this._tooltip = e;
  }

  getBoundingClientRect() {
    return this._tooltip.getBoundingClientRect();
  }

  render() {
    let { x } = this.props.position;
    const { y } = this.props.position;

    if (this.props.expands.horizontal === 'rightwards') {
      x -= ARROW_HORIZONTAL_OFFSET_PX + (ARROW_WIDTH_PX / 2);
    } else {
      x += ARROW_HORIZONTAL_OFFSET_PX + (ARROW_WIDTH_PX / 2);
    }

    return (
      <Tooltip
        ref={this.setTooltipRef}
        position={{ x, y }}
        styleName={this.props.show ? 'expanded' : 'collapsed'}
      >
        <div
          styleName={`doorhanger \
            expands-${this.props.expands.horizontal} \
            expands-${this.props.expands.vertical}`}
          style={{
            ...(this.props.expands.vertical === 'downwards'
              ? { paddingTop: ARROW_HEIGHT_PX }
              : { paddingBottom: ARROW_HEIGHT_PX }),
          }}
        >
          <FittedImage
            src="var(--theme-doorhanger-arrow-image)"
            width={`${ARROW_WIDTH_PX}px`}
            height={`${ARROW_HEIGHT_PX}px`}
            styleName="arrow"
            style={{
              ...(this.props.expands.horizontal === 'rightwards'
                ? { left: ARROW_HORIZONTAL_OFFSET_PX }
                : { right: ARROW_HORIZONTAL_OFFSET_PX }),
            }}
          />
          <div
            className={this.props.className}
            styleName="contents"
          >
            {this.props.children}
          </div>
        </div>
      </Tooltip>
    );
  }
}

StaticDoorhanger.propTypes = {
  show: PropTypes.bool.isRequired,
  expands: PropTypes.shape({
    horizontal: PropTypes.oneOf(['leftwards', 'rightwards']).isRequired,
    vertical: PropTypes.oneOf(['upwards', 'downwards']).isRequired,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

StaticDoorhanger.defaultProps = {
  className: '',
  children: [],
};
