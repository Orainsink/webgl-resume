"use strict";

import Slider from "../libs/sliderLib";

import Layout from "./LayoutObject2D";
import Mouse from "./MouseObject2D";
import Keys from "./KeysObject2D";

/**
 * Help overlay
 *
 * @class Help
 * @constructor
 * @requires jQuery, Sider, Layout, Mouse, Keys
 */
class Help {
  constructor() {
    this.$el = jQuery(".help");
    this.slider = new Slider(this.$el.find(".slider"));

    this.keys = new Keys(this.$el.find(".keys"));
    this.mouse = new Mouse(this.$el.find(".mouse"));
    this.layout = new Layout(this.$el.find(".layout"));
  }
  /**
   * In animation
   *
   * @method in
   */
  in() {
    this.$el.css({ display: "block", opacity: 0 });

    this.slider.start();

    this.slider.$el
      .delay(100)
      .css({ top: "60%", opacity: 0 })
      .animate({ top: "50%", opacity: 1 }, 500);

    this.$el.stop().animate({ opacity: 0.9 }, 500, () => {
      this.keys.start();
      this.mouse.start();
      this.layout.start();
    });

    this.$el.on("click", (event) => {
      if (event.target === this) {
        this.out();
      }
    });

    this.$el.find(".help__quit").on("click", () => {
      this.out();
    });
  }

  /**
   * Out animation
   *
   * @method out
   */
  out() {
    this.$el.stop().animate({ opacity: 0 }, 500, () => {
      this.$el.css("display", "none");

      this.slider.stop();

      this.keys.stop();
      this.mouse.stop();
      this.layout.stop();
    });

    this.$el.off("click");
    this.$el.find(".help__quit").off("click");
  }
}

export default Help;
