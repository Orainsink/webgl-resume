"use strict";

/**
 * Slider
 *
 * @class Slider
 * @constructor
 * @requires jQuery
 */
class Slider {
  constructor($el) {
    this.$el = $el;

    // els
    this.$container = this.$el.find(".slider__slides");
    this.$slides = this.$container.find(".slider__slide");
    this.$map = this.$el.find(".slider__map");

    // vars
    this.totalSlides = this.$slides.length;
    this.slideWidth = 100 / this.totalSlides;
    this.current = 0;
    this.interval = null;

    // init container
    this.$container.css("width", this.totalSlides * 100 + "%");

    // methods
    this.onResize = null;

    // init slides and map
    const $node = jQuery('<div class="slider__map__node">');
    this.$nodes = jQuery();

    this.$slides.each((index, el) => {
      const $slide = jQuery(el);

      $slide.css({
        width: this.slideWidth + "%",
        left: index * this.slideWidth + "%"
      });

      const $nodeCopy = $node.clone();

      // first slide/node setup
      if (index === 0) {
        $slide.addClass("is-active");
        $nodeCopy.addClass("is-active");
      }

      this.$nodes = this.$nodes.add($nodeCopy);
    });

    this.$map.html(this.$nodes);

    // init resize method
    this.onResize = () => {
      let maxHeight = 0;

      this.$slides.each(function() {
        // "this" here direct to each item of slides
        const height = jQuery(this).height();

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      maxHeight += 10;

      this.$el.css({ height: maxHeight, marginTop: -(maxHeight / 2) });
    };

    this.onResize();
  }

  /**
   * Go to next slide
   *
   * @method next
   */
  next() {
    this.current++;

    if (this.current >= this.totalSlides) {
      this.current = 0;
    }

    this.goTo(this.current);
  }

  /**
   * Go to previous slide
   *
   * @method prev
   */
  prev() {
    this.current--;

    if (this.current <= 0) {
      this.current = this.totalSlides;
    }

    this.goTo(this.current);
  }

  /**
   * Go to a specific slide
   *
   * @method goTo
   * @param {Number} [index] Slide's index
   */
  goTo(index) {
    const target = -(index * 100) + "%";

    this.updateMap(index);

    this.$container.stop().animate({ left: target }, 500);

    this.$slides.removeClass("is-active");
    jQuery(this.$slides[index]).addClass("is-active");
  }

  /**
   * Update control nodes
   *
   * @method updateMap
   * @param {Number} [index] Current index
   */
  updateMap(index) {
    this.$nodes.removeClass("is-active");
    jQuery(this.$nodes[index]).addClass("is-active");
  }

  /**
   * Start the slider
   *
   * @method start
   */
  start() {
    this.$nodes.on("click", (e) => {
      const index = jQuery(e.currentTarget).index();
      this.goTo(index);
    });

    // autoplay with pause on hover
    this.interval = window.setInterval(() => {
      this.next();
    }, 10000);

    this.$el.on({
      mouseenter: () => {
        window.clearInterval(this.interval);
      },
      mouseleave: () => {
        this.interval = window.setInterval(() => {
          this.next();
        }, 10000);
      }
    });

    jQuery(window).on("resize", this.onResize);
    this.onResize();
  }

  /**
   * Stop the slider
   *
   * @method next
   */
  stop() {
    this.$nodes.off("click");
    this.$el.off("mouseenter mouseleave");
    jQuery(window).off("resize", this.onResize);

    window.clearInterval(this.interval);
  }
}

export default Slider;
