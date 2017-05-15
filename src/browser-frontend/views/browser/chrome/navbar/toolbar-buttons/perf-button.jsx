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

/* global process */

import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import * as DomainDevSelectors from '../../../../../selectors/domain-dev-selectors';
import DeveloperEffects from '../../../../../actions/effects/developer-effects';

import Styles from './perf-button.css';
import Button from '../../../../../../shared/widgets/button';

@connect(state => ({
  visible: process.env.NODE_ENV === 'development',
  recording: DomainDevSelectors.getPerfRecording(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class PerfButton extends PureComponent {
  handleClick = () => {
    if (!this.props.recording) {
      this.props.dispatch(DeveloperEffects.commands.perf.startRecording());
    } else {
      this.props.dispatch(DeveloperEffects.commands.perf.stopRecording({ logMeasured: true }));
    }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <Button
        title="Measure Performance"
        styleName={`perf-button ${this.props.recording ? 'recording' : ''}`}
        onClick={this.handleClick}
      >
        <FontAwesome
          name="tachometer"
          styleName="fa-icon"
        />
      </Button>
    );
  }
}

PerfButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  recording: PropTypes.bool.isRequired,
};
