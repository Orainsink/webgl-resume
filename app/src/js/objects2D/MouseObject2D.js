"use strict";

/**
 * Animated mouse
 *
 * @class Mouse
 * @constructor
 * @requires jQuery
 */
class Mouse {
  constructor($el) {
    this.$el = $el;

    this.$wheel = this.$el.find(".mouse__wheel");
    this.$lines = this.$wheel.find(".mouse__wheel__lines");

    this.interval = null;
    this.y = 0;
  }

  /**
   * Animate wheel
   *
   * @method scroll
   */
  scroll() {
    this.y = this.y === 0 ? -80 : 0;

    this.$wheel.stop().animate({ opacity: 1 }, 400);

    let y = this.y;

    this.$lines.stop().animate(
      {
        top: y + "%"
      },
      500,
      () => {
        this.$wheel.stop().animate(
          {
            opacity: 0.2
          },
          300
        );
      }
    );
  }

  /**
   * Start animation
   *
   * @method start
   */
  start() {
    this.interval = window.setInterval(() => {
      this.scroll();
    }, 2000);
  }

  /**
   * Stop animation
   *
   * @method stop
   */
  stop() {
    window.clearInterval(this.interval);
  }
}

export default Mouse;
