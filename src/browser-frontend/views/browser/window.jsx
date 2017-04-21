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

import { client } from '../../global';
import PagesModelActions from '../../actions/pages-model-actions';
import * as SharedPropTypes from '../../model/shared-prop-types';
import SharedActions from '../../../shared/actions/shared-actions';

import Styles from './window.css';
import Chrome from './chrome';
import Content from './content';

@connect(() => ({
  client,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class Window extends PureComponent {
  componentDidMount() {
    // Some keyboard shortcuts need to be registered at the platform level,
    // because they clash with OS-level shortcuts (e.g. Cmd+W on macOS
    // hides windows, but we want it to close tabs instead.). The platform
    // is tasked with overriding these shortcuts and providing us control.
    this.props.client.send(SharedActions.commands.fromFrontend.toServer.app.window.keyShortcuts.register([
      { keys: 'CommandOrControl+Q' },
      { keys: 'CommandOrControl+W' },
    ]));

    // For everything else, listening to key events in the frontend is fine.
    this.mousetrap = Mousetrap();
    this.mousetrap.bind('mod+t', () => {
      this.props.dispatch(PagesModelActions.addPage());
    });
    this.mousetrap.bind('up up down down left right left right b a', () => {
      const url = 'http://chilloutandwatchsomecatgifs.com/';
      this.props.dispatch(PagesModelActions.addPage({ url }));
    });
  }

  render() {
    return (
      <div styleName="window">
        <Chrome />
        <Content />
      </div>
    );
  }
}

Window.WrappedComponent.propTypes = {
  client: SharedPropTypes.Client.isRequired,
  dispatch: PropTypes.func.isRequired,
};
