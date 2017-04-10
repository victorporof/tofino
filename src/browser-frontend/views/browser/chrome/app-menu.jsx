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

import Styles from './app-menu.css';
import Doorhanger from '../../../../shared/widgets/doorhanger';

import * as UIMenusSelectors from '../../../selectors/ui-menus-selectors';

@connect(state => ({
  appMenuOpen: UIMenusSelectors.getAppMenuOpen(state),
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class AppMenu extends PureComponent {
  render() {
    return (
      <Doorhanger
        show={this.props.appMenuOpen}
        anchorSelector=".app-menu-doorhanger-anchor"
        anchorDocument={document}
        verticalOffsetPx={14}
        expands={{
          horizontal: 'leftwards',
          vertical: 'downwards',
        }}
      >
        <div styleName="app-menu">
          <div>Hello world</div>
        </div>
      </Doorhanger>
    );
  }
}

AppMenu.WrappedComponent.propTypes = {
  appMenuOpen: PropTypes.bool.isRequired,
};
