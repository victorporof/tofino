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

export default class WebContents extends PureComponent {
  static _instances = new Set()

  constructor(...args) { // eslint-disable-line
    super(...args);
  }

  static getWebContentsWithId(id) {
    for (const instance of WebContents._instances) {
      if (instance.props.id === id) {
        return instance;
      }
    }
    return null;
  }

  componentDidMount() {
    WebContents._instances.add(this);
  }

  componentWillUnmount() {
    WebContents._instances.delete(this);
  }

  setImplRef = (e) => {
    this._impl = e;
  }

  get impl() {
    return this._impl;
  }

  render() {
    const Impl = this.props.impl;
    return (
      <Impl
        ref={this.setImplRef}
        {...this.props}
      />
    );
  }
}

WebContents.propTypes = {
  impl: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
};
