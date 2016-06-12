/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerRendering
 */
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerRendering
 */
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerRendering
 */
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerRendering
 */
'use strict';

import ReactDOMContainerInfo from 'ReactDOMContainerInfo';
import ReactDefaultBatchingStrategy from 'ReactDefaultBatchingStrategy';
import ReactElement from 'ReactElement';
import ReactInstrumentation from 'ReactInstrumentation';
import ReactMarkupChecksum from 'ReactMarkupChecksum';
import ReactReconciler from 'ReactReconciler';
import ReactServerBatchingStrategy from 'ReactServerBatchingStrategy';
import ReactServerRenderingTransaction from 'ReactServerRenderingTransaction';
import ReactUpdates from 'ReactUpdates';
import emptyObject from 'emptyObject';
import instantiateReactComponent from 'instantiateReactComponent';
import invariant from 'invariant';

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup
 */
function renderToStringImpl(element, makeStaticMarkup) {
  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    transaction = ReactServerRenderingTransaction.getPooled(makeStaticMarkup);

    return transaction.perform(function() {
      if (__DEV__) {
        ReactInstrumentation.debugTool.onBeginFlush();
      }
      var componentInstance = instantiateReactComponent(element);
      var markup = ReactReconciler.mountComponent(
        componentInstance,
        transaction,
        null,
        ReactDOMContainerInfo(),
        emptyObject
      );
      if (__DEV__) {
        ReactInstrumentation.debugTool.onUnmountComponent(
          componentInstance._debugID
        );
        ReactInstrumentation.debugTool.onEndFlush();
      }
      if (!makeStaticMarkup) {
        markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
      }
      return markup;
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);
    // Revert to the DOM batching strategy since these two renderers
    // currently share these stateful modules.
    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  }
}

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
 */
function renderToString(element) {
  invariant(
    ReactElement.isValidElement(element),
    'renderToString(): You must pass a valid ReactElement.'
  );
  return renderToStringImpl(element, false);
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  invariant(
    ReactElement.isValidElement(element),
    'renderToStaticMarkup(): You must pass a valid ReactElement.'
  );
  return renderToStringImpl(element, true);
}

export default {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
};