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

import Styles from './tab-contents.css';
import TabTitle from './tab-title';
import TabFavicon from './tab-favicon';
import TabCloseButton from './tab-close-button';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabContents extends PureComponent {
  render() {
    return (
      <div styleName="tab-contents">
        <TabFavicon pageId={this.props.pageId} />
        <TabTitle pageId={this.props.pageId} />
        <TabCloseButton pageId={this.props.pageId} />
      </div>
    );
  }
}

TabContents.propTypes = {
  pageId: PropTypes.string.isRequired,
};
