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
import FontAwesome from 'react-fontawesome';

import Styles from './security-badge.css';
import Button from '../../../../../../../shared/widgets/button';

@CSSModules(Styles, {
  allowMultiple: true,
})
export default class SecurityBadge extends PureComponent {
  handleClick = () => {
    // TODO
  }

  render() {
    return (
      <Button
        title="Security"
        styleName="security-badge"
        onClick={this.handleClick}
      >
        <FontAwesome name="unlock-alt" styleName="icon" />
        <div>
          Security
        </div>
      </Button>
    );
  }
}
