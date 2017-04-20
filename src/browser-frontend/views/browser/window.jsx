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
// import * as SharedPropTypes from '../../model/shared-prop-types';
// import SharedActions from '../../../shared/actions/shared-actions';
// import * as UIPagesSelectors from '../../selectors/ui-pages-selectors';

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
    this.mousetrap = Mousetrap();
    this.mousetrap.bind('mod+t', () => {
      this.props.dispatch(PagesModelActions.addPage());
    });
    // this.mousetrap.bind('mod+q', () => {
    //   this.props.client.send(SharedActions.events.fromFrontend.toServer.app.window.requestedClose());
    // });
    // this.mousetrap.bind('mod+w', () => {
    //   this.props.dispatch((dispatch, getState) => {
    //     const pageId = UIPagesSelectors.getSelectedPageId(getState());
    //     this.props.dispatch(PagesModelActions.removePage({ pageId }));
    //   });
    // });
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
  // client: SharedPropTypes.Client.isRequired,
  dispatch: PropTypes.func.isRequired,
};
