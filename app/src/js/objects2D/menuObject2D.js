"use strict";

require("jquery-ui/ui/effect.js");

/**
 * Menu
 *
 * @class Menu
 * @constructor
 * @requires jQuery
 */
function Menu() {
  const $el = jQuery(".menu");
  const $button = $el.find(".menu__button");
  const $itemsContainer = $el.find(".menu__items");
  const $items = $el.find(".menu__item");

  let _callback = function() {};
  let timeouts = [];

  function onMouseover() {
    $items.on("click", _callback);

    $itemsContainer.css("display", "block");

    $el.stop().animate({ left: 0 }, { duration: 400, easing: "easeOutQuart" });
    $button.stop().animate({ opacity: 0 }, 400);

    $items.each(function(i) {
      const $el = jQuery(this);

      const timeout = window.setTimeout(function() {
        $el.stop().animate({ opacity: 1 }, 400);
      }, i * 200);

      timeouts.push(timeout);
    });

    $el.one("mouseleave", onMouseout);
  }

  function onMouseout() {
    if (timeouts) {
      for (var i = 0, j = timeouts.length; i < j; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }

    $el.stop().animate({ left: 30 }, { duration: 400, easing: "easeOutQuart" });
    $button.stop().animate({ opacity: 0.5 }, 400);
    $items.stop().animate({ opacity: 0 }, 400, function() {
      $itemsContainer.css("display", "none");
      $items.off("click", _callback);
    });

    $button.one("mouseover click", onMouseover);
  }

  $button.one("mouseover click", onMouseover);

  return {
    in: function() {
      $el.animate({ top: 0, opacity: 1 }, 500);
    },

    onClick: function(callback) {
      _callback = callback;
    }
  };
}

export default Menu;
