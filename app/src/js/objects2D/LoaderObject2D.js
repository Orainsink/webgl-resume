"use strict";

/**
 * Preloader
 *
 * @class Loader
 * @constructor
 * @requires jQuery
 */
class Loader {
  constructor() {
    this.$el = jQuery(".loader");
    this.$title = this.$el.find(".loader__title");
    this.$progress = this.$el.find(".loader__progress");
  }
  /**
   * Out animation
   *
   * @method out
   */
  out() {
    this.$progress.stop().animate(
      { width: "100%" },
      1000,
      function() {
        this.$el.animate(
          { opacity: 0 },
          1000,
          function() {
            this.$el.css("display", "none");
          }.bind(this)
        );

        this.$title.animate({ top: "-10%", opacity: 0 }, 500);
        this.$progress.animate({ height: 0 }, 400);
      }.bind(this)
    );
  }

  /**
   * Update the percent loaded
   *
   * @method update
   * @param {Number} [percent]
   */
  update() {}
}

export default Loader;
