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

import PagesEffects from '../../../../../actions/effects/pages-effects';
import * as UIPagesSelectors from '../../../../../selectors/ui-pages-selectors';

import Styles from './tab-close-button.css';
import Button from '../../../../../../shared/widgets/button';
import FittedImage from '../../../../../../shared/widgets/fitted-image';

@connect((state, ownProps) => ({
  selected: UIPagesSelectors.getSelectedPageId(state) === ownProps.pageId,
}))
@CSSModules(Styles, {
  allowMultiple: true,
})
export default class TabCloseButton extends PureComponent {
  handleMouseDown = (e) => {
    this.props.dispatch(PagesEffects.commands.closeTabAnimated({
      pageId: this.props.pageId,
      removePageAfterMs: 200,
    }));
    e.stopPropagation();
  }

  render() {
    return (
      <Button
        title="Close"
        styleName={`tab-close-button ${this.props.selected ? '' : 'tab-deselected'}`}
        onMouseDown={this.handleMouseDown}
      >
        <FittedImage
          src="var(--theme-close-tab-button-image)"
          width="11px"
          height="11px"
          styleName="tab-close-icon"
        />
      </Button>
    );
  }
}

TabCloseButton.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};
