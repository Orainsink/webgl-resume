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
          require("Assets/sounds//background.mp3"),
          require("Assets/sounds//background.ogg"),
          require("Assets/sounds//background.wav")
        ],
        loop: true,
        volume: 0.5
      }),
      wind: new Howl({
        src: [
          require("Assets/sounds//wind.mp3"),
          require("Assets/sounds//wind.ogg"),
          require("Assets/sounds//wind.wav")
        ]
      }),
      whitenoise: new Howl({
        src: [
          require("Assets/sounds//whitenoise.mp3"),
          require("Assets/sounds//whitenoise.ogg"),
          require("Assets/sounds//whitenoise.wav")
        ],
        volume: 0.05
      }),
      neon: new Howl({
        src: [
          require("Assets/sounds//neon.mp3"),
          require("Assets/sounds//neon.ogg"),
          require("Assets/sounds//neon.wav")
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
