"use strict";

/**
 * Debounce a function
 * https://github.com/jashkenas/underscore
 *
 * @method debounce
 * @param {Function} [callback]
 * @param {Number} [delay]
 * @param {Boolean} [immediate]
 * @return {Function}
 */
function debounce(callback, delay, immediate) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    const callLater = function() {
      timeout = null;
      if (!immediate) {
        callback.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(callLater, delay);
    if (callNow) {
      callback.apply(context, args);
    }
  };
}

export default debounce;
