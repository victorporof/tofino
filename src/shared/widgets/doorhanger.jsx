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

/* global requestAnimationFrame, cancelAnimationFrame */

import React, { Component, PropTypes } from 'react';
import isBrowser from 'is-browser';

import StaticDoorhanger from './static-doorhanger';
import { shouldComponentWithPlainJsPropsUpdate } from './helpers/should-component-update';

const DEFAULT_POSITION = {
  left: 0,
  top: 0,
};

/**
 * Doorhangers are smart-ish wrappers around static doorhangers which
 * continuously and automatically calculate their positioning based on certain
 * `expands` rules and an `anchorSelector` in a particular `anchorDocument`.
 */

export default class Doorhanger extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentWithPlainJsPropsUpdate.bind(this);
    this.state = { position: DEFAULT_POSITION };
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillUnmount() {
    if (isBrowser) {
      cancelAnimationFrame(this._positionUpdater);
    }
  }

  updatePosition = () => {
    if (isBrowser) {
      this._positionUpdater = requestAnimationFrame(this.updatePosition);
    }

    const anchor = this.props.anchorDocument.querySelector(this.props.anchorSelector);
    if (!anchor) {
      this.setState({ position: DEFAULT_POSITION });
      return;
    }

    const anchorBounds = anchor.getBoundingClientRect();
    const anchorCenterX = anchorBounds.left + (anchorBounds.width / 2);
    const anchorCenterY = anchorBounds.top + (anchorBounds.height / 2);

    const viewportWidth = this.props.anchorDocument.documentElement.clientWidth;
    const viewportHeight = this.props.anchorDocument.documentElement.clientHeight;

    const position = {};

    if (this.props.expands.horizontal === 'rightwards') {
      position.left = anchorCenterX;
    } else {
      position.right = viewportWidth - anchorCenterX;
    }

    if (this.props.expands.vertical === 'downwards') {
      position.top = anchorCenterY;
    } else {
      position.bottom = viewportHeight - anchorCenterY;
    }

    this.setState({ position });
  }

  render() {
    return (<StaticDoorhanger
      {...this.props}
      position={this.state.position}
    />);
  }
}

Doorhanger.propTypes = {
  anchorSelector: PropTypes.string.isRequired,
  anchorDocument: PropTypes.shape({
    querySelector: PropTypes.func.isRequired,
    documentElement: PropTypes.shape({
      clientWidth: PropTypes.number.isRequired,
      clientHeight: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  expands: PropTypes.shape({
    horizontal: PropTypes.oneOf(['leftwards', 'rightwards']).isRequired,
    vertical: PropTypes.oneOf(['upwards', 'downwards']).isRequired,
  }).isRequired,
};
