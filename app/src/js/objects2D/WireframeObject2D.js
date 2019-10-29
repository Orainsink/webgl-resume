"use strict";

/**
 * Animated wireframe
 *
 * @class Wireframe
 * @constructor
 * @param {jQuery} [$el] DOM element
 * @param {Object} [options]
 * @param {Number} [options.delay] Delay between frames
 * @param {Array} [options.positions] Animated scroll positions
 * @requires jQuery
 */
class Wireframe {
  constructor($el, options) {
    this.parameters = jQuery.extend(
      {
        delay: 200,
        positions: [-20, -90, -135, -200, -20, 40]
      },
      options
    );

    this.$topLines = $el.find(".wireframe__frame--top");
    this.$bottomLines = $el.find(".wireframe__frame--bottom");
    this.$leftLines = $el.find(".wireframe__frame--left");
    this.$rightLines = $el.find(".wireframe__frame--right");
    this.$leftColumn = $el.find(".wireframe__column--left");
    this.$textLines = $el.find(".wireframe__text__line");
    this.$controlNodes = $el.find(".wireframe__controls__node");

    this.interval = null;
    this.totalPositions = this.parameters.positions.length;
    this.currentPosition = 0;
  }
  /**
   * In animation
   *
   * @method in
   * @param {Boolean} [out] Out instead of in?
   */
  in(out) {
    // targets
    let targetLines;
    let targetTextLines;
    let targetIncompleteTextLines;
    let targetNodes;

    if (out === 0) {
      targetLines = targetTextLines = targetIncompleteTextLines = 0;
      targetNodes = 30;
    } else {
      targetLines = targetTextLines = "100%";
      targetIncompleteTextLines = "60%";
      targetNodes = 0;
    }

    // frames
    const totalFrames = this.$topLines.length;

    const setAnimation = (index) => {
      const $top = jQuery(this.$topLines[index]);
      const $bottom = jQuery(this.$bottomLines[index]);
      const $left = jQuery(this.$leftLines[index]);
      const $right = jQuery(this.$rightLines[index]);

      setTimeout(function() {
        $top.css("width", targetLines);
        $right.css("height", targetLines);
      }, index * this.parameters.delay + 400);

      setTimeout(function() {
        $left.css("height", targetLines);
        $bottom.css("width", targetLines);
      }, index * this.parameters.delay + 600);
    };

    // set animations for each frame
    for (let i = 0; i < totalFrames; i++) {
      setAnimation(i);
    }

    // text
    const delay = this.parameters.delay;

    this.$textLines.each(function(i) {
      const $line = jQuery(this);

      setTimeout(() => {
        $line.css(
          "width",
          $line.hasClass("wireframe__text__line--incomplete")
            ? targetIncompleteTextLines
            : targetTextLines
        );
      }, i * delay);
    });

    // control nodes
    this.$controlNodes.each(function(i) {
      const $node = jQuery(this);

      setTimeout(function() {
        $node.css("top", targetNodes);
      }, i * delay);
    });
  }

  /**
   * Out animation
   *
   * @method out
   */
  out() {
    this.$topLines.css("width", 0);
    this.$bottomLines.css("width", 0);
    this.$leftLines.css("height", 0);
    this.$rightLines.css("height", 0);
    this.$textLines.css("width", 0);
    this.$controlNodes.css("top", 30);
  }

  /**
   * Start animation
   *
   * @method start
   */
  start() {
    if (this.interval) {
      return false;
    }

    this.interval = setInterval(() => {
      if (this.currentPosition > this.totalPositions) {
        this.currentPosition = 0;
      }

      this.$leftColumn.css(
        "top",
        this.parameters.positions[this.currentPosition] + "px"
      );

      this.currentPosition++;
    }, 2000);
  }

  /**
   * Stop animation
   *
   * @method stop
   */
  stop() {
    if (!this.interval) {
      return false;
    }

    window.clearInterval(this.interval);
    this.interval = null;
  }
}

export default Wireframe;
