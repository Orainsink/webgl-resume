"use strict";

/**
 * Animated layout
 *
 * @class Layout
 * @constructor
 * @requires jQuery
 */

class Layout {
  constructor($el) {
    this.$el = $el;

    this.$container = this.$el.find(".layout__parts");
    this.$mouse = this.$el.find(".layout__mouse");
    this.$click = this.$mouse.find(".layout__mouse__click");

    // targets
    this.y = 0;
    this.openY = -15;
    this.mouseY = 90;

    this.interval = null;
  }
  /**
   * Animation next step
   *
   * @method slide
   */
  slide() {
    // update targets
    if (this.y === 0) {
      this.y = -100;
      this.openY = -15;
      this.mouseY = 83;
    } else {
      this.y = 0;
      this.openY = -85;
      this.mouseY = 3;
    }

    const open = () => {
      this.$container.animate(
        {
          top: this.openY + "%"
        },
        800,
        function() {
          click();
        }
      );
    };

    const moveMouse = () => {
      let flag = false;

      this.$mouse.animate(
        { top: this.mouseY + "%" },
        {
          duration: 500,
          progress: (animation, progress) => {
            if (!flag && progress > 0.5) {
              flag = !flag;
              open();
            }
          }
        }
      );
    };

    const click = () => {
      let flag = false;
      this.$click.delay(500).animate(
        {
          width: 70,
          height: 70,
          "margin-left": -35,
          "margin-top": -35,
          opacity: 0
        },
        {
          duration: 400,
          progress: (animation, progress) => {
            if (!flag && progress > 0.7) {
              flag = !flag;
              slide();
            }
          },
          complete: () => {
            this.$click.css({
              width: 0,
              height: 0,
              "margin-left": 0,
              "margin-top": 0,
              opacity: 1
            });
          }
        }
      );
    };

    const slide = () => {
      this.$container.animate({ top: this.y + "%" }, 500);
      centerMouse();
    };

    const centerMouse = () => {
      this.$mouse.delay(300).animate({ top: "45%" }, 500);
    };

    moveMouse();
  }

  /**
   * Start animation
   *
   * @method start
   */
  start() {
    this.slide();

    this.interval = window.setInterval(() => {
      this.slide();
    }, 4000);
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

export default Layout;
