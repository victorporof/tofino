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
import Mousetrap from 'mousetrap';

import * as Meta from '../../constants/meta';
import { client } from '../../global';
import KeyboardShortcutsActions from '../../actions/keyboard-shortcuts-actions';
import * as SharedPropTypes from '../../model/shared-prop-types';
import SharedActions from '../../../shared/actions/shared-actions';

import Styles from './window.css';
import Chrome from './chrome';
import Content from './content';

@connect(() => ({
  client,
  os: Meta.OS,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Window extends PureComponent {
  componentDidMount() {
    // Some keyboard shortcuts need to be registered at the platform level,
    // because they clash with OS-level shortcuts (e.g. Cmd+W on macOS
    // hides windows, but we want it to close tabs instead.). The platform
    // is responsible with overriding these shortcuts and providing us control.
    this.props.client.send(SharedActions.commands.fromFrontend.toServer.app.window.keyShortcuts.register([
      { keys: 'CommandOrControl+Q' },
      { keys: 'CommandOrControl+W' },
    ]));

    // For everything else, listening to key events in the frontend is fine.
    // We should listen to the above "special" key events normally too, so that
    // all shortcuts work headless as well (when opening the frontend in a tab).
    this.mousetrap = Mousetrap();
    this.mousetrap.bind('mod+q', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedAccelQ());
    });
    this.mousetrap.bind('mod+w', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedAccelW());
    });
    this.mousetrap.bind('mod+t', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedAccelT());
    });
    this.mousetrap.bind('ctrl+tab', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedCtrlTab());
    });
    this.mousetrap.bind('ctrl+shift+tab', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedCtrlShiftTab());
    });
    this.mousetrap.bind('up up down down left right left right b a', (e) => {
      e.preventDefault();
      this.props.dispatch(KeyboardShortcutsActions.pressedCatGifsEasterEgg());
    });
  }

  render() {
    return (
      <div styleName={`window ${this.props.os}`}>
        <Chrome />
        <Content />
      </div>
    );
  }
}

Window.WrappedComponent.propTypes = {
  os: PropTypes.string.isRequired,
  client: SharedPropTypes.Client.isRequired,
  dispatch: PropTypes.func.isRequired,
};
