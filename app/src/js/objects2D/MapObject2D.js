"use strict";

/**
 * Navigation Map
 *
 * @class Map
 * @constructor
 * @requires jQuery
 */
class Map {
  constructor() {
    this.$el = jQuery('<div class="map"></div>');
    this.callback = function() {};
    this.$node = jQuery('<div class="map__node"></div>');
  }

  /**
   * Add a new node
   *
   * @method addNode
   * @param {Number} [index]
   */
  addNode(index) {
    let $node = this.$node.clone();
    $node.attr("data-index", index);

    this.$el.append($node);
  }

  /**
   * Initialize
   *
   * @method init
   */
  init() {
    let _this = this;

    // event
    this.$el.on("click", ".map__node", function() {
      let index = jQuery(this).data("index");
      _this.callback(index);
    });

    // center
    this.$el.css("margin-top", -this.$el.height() / 2);

    // nodes
    this.$nodes = this.$el.find(".map__node");
  }

  /**
   * Set onClick callback
   *
   * @method onClick
   * @param {Function} [callback]
   */
  onClick(callback) {
    this.callback = callback;
  }

  /**
   * Set active node (.is-active)
   *
   * @method setActive
   * @param {Number} [index]
   */
  setActive(index) {
    this.$nodes.removeClass("is-active");
    jQuery(this.$nodes[index]).addClass("is-active");
  }

  /**
   * In animation
   *
   * @method in
   */
  in() {
    this.$nodes.each(function(i) {
      jQuery(this)
        .delay(i * 50)
        .animate({ right: 0, opacity: 1 }, 500);
    });
  }
}

export default Map;
