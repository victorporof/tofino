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

import shallowEqual from 'react-pure-render/shallowEqual';
import deepEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

// This method is intended to be used only for components which don't contain
// any immutable.js objects as props, only plain js objects. Simply use
// React's `PureComponent` directly when using only immutable.js props.
export function shouldComponentWithPlainJsPropsUpdate(nextProps, nextState) {
  const currChildren = this.props.children;
  const nextChildren = nextProps.children;

  const currPlainJsProps = omit(this.props, ['children']);
  const nextPlainJsProps = omit(nextProps, ['children']);

  return (
    !shallowEqual(this.state, nextState)) ||
    !shallowEqual(currChildren, nextChildren) ||
    !deepEqual(currPlainJsProps, nextPlainJsProps);
}

// Like the previous method, but can be used for components that have both
// immutable.js objects along with plain js objects as props. This version of
// the `shouldComponentUpdate` method performs shallow equality comparisons on
// immutable.js props, and deep equality comparisons the the other props.
export function shouldComponentWithPlainAndImmutableJsPropsUpdate({ immutables }, nextProps, nextState) {
  const currChildren = this.props.children;
  const nextChildren = nextProps.children;

  const currImmutableProps = pick(this.props, immutables);
  const nextImmutableProps = pick(nextProps, immutables);

  const currPlainJsProps = omit(this.props, ['children', ...immutables]);
  const nextPlainJsProps = omit(nextProps, ['children', ...immutables]);

  return (
    !shallowEqual(this.state, nextState)) ||
    !shallowEqual(currChildren, nextChildren) ||
    !shallowEqual(currImmutableProps, nextImmutableProps) ||
    !deepEqual(currPlainJsProps, nextPlainJsProps);
}
