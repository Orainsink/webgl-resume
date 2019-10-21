"use strict";

import { Howl, Howler } from "howler";
const visibly = require("visibilityjs");

/**
 * Sounds module
 *
 * @module SOUNDS
 * @requires Howler, visibly
 */
var SOUNDS = (function() {
  var instance;

  function init() {
    var isMuted = false;

    return {
      /**
       * Toggle on/off sounds
       *
       * @method toogle
       */
      toggle: function() {
        if (isMuted) {
          Howler.mute(false);
        } else {
          Howler.mute(true);
        }

        isMuted = !isMuted;
      },

      /**
       * Is muted
       * @method isMuted
       * @return {Boolean}
       */
      isMuted: function() {
        return Howler._muted;
      },

      background: new Howl({
        src: [
          require("Public/sounds/background.mp3"),
          require("Public/sounds/background.ogg"),
          require("Public/sounds/background.wav")
        ],
        loop: true,
        volume: 0.5
      }),
      wind: new Howl({
        src: [
          require("Public/sounds/wind.mp3"),
          require("Public/sounds/wind.ogg"),
          require("Public/sounds/wind.wav")
        ]
      }),
      whitenoise: new Howl({
        src: [
          require("Public/sounds/whitenoise.mp3"),
          require("Public/sounds/whitenoise.ogg"),
          require("Public/sounds/whitenoise.wav")
        ],
        volume: 0.05
      }),
      neon: new Howl({
        src: [
          require("Public/sounds/neon.mp3"),
          require("Public/sounds/neon.ogg"),
          require("Public/sounds/neon.wav")
        ],
        volume: 0.05
      })
    };
  }

  return {
    /**
     * Return SOUNDS instance
     *
     * @method getInstance
     * @return {SOUNDS}
     */
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

// tab active/inactive
// TODO let the sound can be muted when the page is invisible
/*
visibly.onHidden(function() {
  Howler.mute();
});
*/

visibly.onVisible(function() {
  Howler.mute(false);
});
// TODO add button to start sound
export default SOUNDS.getInstance();
