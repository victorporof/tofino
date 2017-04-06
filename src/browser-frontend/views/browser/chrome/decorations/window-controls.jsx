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

import * as Meta from '../../../../constants/meta';
import { client } from '../../../../global';
import * as SharedPropTypes from '../../../../model/shared-prop-types';
import SharedActions from '../../../../../shared/actions/shared-actions';

import Styles from './window-controls.css';
import Button from '../../../../../shared/widgets/button';

@connect(() => ({
  client,
  os: Meta.OS,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class WindowControls extends PureComponent {
  handleCloseWindow = () => {
    this.props.client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedClose());
  }

  handleMinimizeWindow = () => {
    this.props.client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedMinimize());
  }

  handleMaximizeWindow = () => {
    this.props.client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedMaximize());
  }

  render() {
    // Showing native window controls on macOS..
    if (this.props.os === 'darwin') {
      return null;
    }
    return (
      <div styleName="window-controls">
        <Button
          title="Minimize"
          styleName="minimize"
          onClick={this.handleMinimizeWindow}
        />
        <Button
          title="Maximize"
          styleName="maximize"
          onClick={this.handleMaximizeWindow}
        />
        <Button
          title="Close"
          styleName="close"
          onClick={this.handleCloseWindow}
        />
      </div>
    );
  }
}

WindowControls.WrappedComponent.propTypes = {
  client: SharedPropTypes.Client.isRequired,
  os: PropTypes.string.isRequired,
};
