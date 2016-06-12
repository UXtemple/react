/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

'use strict';

import ReactChildren from 'ReactChildren';
import ReactComponent from 'ReactComponent';
import ReactClass from 'ReactClass';
import ReactDOMFactories from 'ReactDOMFactories';
import ReactElement from 'ReactElement';
import ReactElementValidator from 'ReactElementValidator'; // __DEV__
import ReactPropTypes from 'ReactPropTypes';
import ReactVersion from 'ReactVersion';
import onlyChild from 'onlyChild';
import warning from 'warning';

export var createElement = __DEV__ ? ReactElementValidator.createElement : ReactElement.createElement;
export var createFactory = __DEV__ ? ReactElementValidator.createFactory : ReactElement.createFactory;
export var cloneElement = __DEV__ ? ReactElementValidator.cloneElement : ReactElement.cloneElement;

var warned = false;
function spreadWithWarning() {
  warning(
    warned,
    'React.__spread is deprecated and should not be used. Use ' +
    'Object.assign directly or another helper function with similar ' +
    'semantics. You may be seeing this warning due to your compiler. ' +
    'See https://fb.me/react-spread-deprecation for more details.'
  );
  warned = true;
  return Object.assign.apply(null, arguments);
};

export var __spread = __DEV__ ? Object.assign : spreadWithWarning;

export function createMixin(mixin) {
  // Currently a noop. Will be used to validate and trace mixins.
  return mixin;
}

export var Children = {
  map: ReactChildren.map,
  forEach: ReactChildren.forEach,
  count: ReactChildren.count,
  toArray: ReactChildren.toArray,
  only: onlyChild,
};

export {
  ReactComponent as Component,
  ReactDOMFactories as DOM,
  ReactPropTypes as PropTypes,
  ReactVersion as version,
};

export var createClass = ReactClass.createClass;
export var isValidElement = ReactElement.isValidElement;

export default {
  // Modern
  Children: Children,

  Component: ReactComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread,
};
