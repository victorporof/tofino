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

import * as Meta from '../../../constants/meta';

import Styles from './tabbar.css';
import TabsList from './tabbar/tabs-list';
import NewTabButton from './tabbar/new-tab-button';

@connect(() => ({
  os: Meta.OS,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabBar extends PureComponent {
  render() {
    return (
      <div styleName={`tabbar ${this.props.os}`}>
        <TabsList />
        <NewTabButton />
      </div>
    );
  }
}

TabBar.WrappedComponent.propTypes = {
  os: PropTypes.string.isRequired,
};
