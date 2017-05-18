
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

import ImageButton from '../../../../../shared/widgets/image-button';

export default class CopyButton extends PureComponent {
  handleCopy = () => {
    // TODO
  }

  render() {
    return (
      <ImageButton
        className={this.props.className}
        title="Copy"
        onClick={this.handleCopy}
        src="var(--theme-app-menu-copy-button-image)"
        width="14px"
        height="14px"
      />
    );
  }
}

CopyButton.propTypes = {
  className: PropTypes.string,
};

CopyButton.defaultProps = {
  className: '',
};
