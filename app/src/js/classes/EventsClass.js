"use strict";

/**
 * Event bus
 *
 * @class Events
 * @constructor
 */

class Events {
  constructor() {
    this.events = {};
    this.id = -1;
  }

  /**
   * Register event
   *
   * @method on
   * @param {String} [name]
   * @param {Function} [callback]
   * @return {Number} [id]
   */
  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    let id = (++this.id).toString();

    this.events[name].push({
      id: id,
      callback: callback
    });
    // TODO wonder id should be string or num
    return id;
  }

  /**
   * Trigger event
   *
   * @method trigger
   * @param {String} [name]
   * @param {Object} [data]
   */
  trigger(name, data) {
    if (!this.events[name]) {
      return false;
    }

    let suscribers = this.events[name];
    for (let i = 0, j = suscribers.length; i < j; i++) {
      suscribers[i].callback.apply(data);
    }
  }
}

export default Events;
