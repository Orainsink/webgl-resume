"use strict";

/**
 * Animated keyboard keys
 *
 * @class Keys
 * @constructor
 * @requires jQuery
 */
class Keys {
  constructor($el) {
    this.$el = $el;

    this.$top = this.$el.find(".key--top");
    this.$bottom = this.$el.find(".key--bottom");

    this.interval = null;
    this.current = "top";
  }

  /**
   * Hightlight a key
   *
   * @method highlight
   */
  highlight() {
    this.current = this.current === "top" ? "bottom" : "top";
    let $el = this.current === "top" ? this.$top : this.$bottom;

    $el.stop().animate(
      {
        opacity: 1
      },
      400,
      function() {
        $el.stop().animate(
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
      this.highlight();
    }, 1000);
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

export default Keys;
