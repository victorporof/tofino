
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

import AnimatedImageButton from '../../../../../shared/widgets/animated-image-button';

export default class PasteButton extends PureComponent {
  handlePaste = () => {
    // TODO
  }

  render() {
    return (
      <AnimatedImageButton
        className={this.props.className}
        title="Paste"
        onClick={this.handlePaste}
        src="var(--theme-app-menu-paste-button-image)"
        width="14px"
        height="14px"
      />
    );
  }
}
PasteButton.propTypes = {
  className: PropTypes.string,
};

PasteButton.defaultProps = {
  className: '',
};
