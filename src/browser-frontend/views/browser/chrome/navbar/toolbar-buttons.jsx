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

import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';

import Styles from './toolbar-buttons.css';
import VerticalSeparator from '../../../../../shared/widgets/vertical-separator';
import MenuButton from './toolbar-buttons/menu-button';
import SidebarButton from './toolbar-buttons/sidebar-button';
import LibraryButton from './toolbar-buttons/library-button';
import ExtensionsButton from './toolbar-buttons/extensions-button';
import PerfButton from './toolbar-buttons/perf-button';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class ToolbarButtons extends PureComponent {
  render() {
    return (
      <div styleName="toolbar-buttons">
        <PerfButton />
        <ExtensionsButton />
        <LibraryButton />
        <SidebarButton />
        <VerticalSeparator styleName="separator" />
        <MenuButton />
      </div>
    );
  }
}
