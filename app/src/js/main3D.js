"use strict";

import "../less/main3D.less";
require("./polyfills/animFramePolyfill");

import { TweenLite } from "gsap/all";

TweenLite.defaultEase = window.Quad.easeInOut;

import "./libs/waypointLib";

import APP from "./modules/appModule";
import SCENE from "./modules/sceneModule";
import SOUNDS from "./modules/soundsModule";
import HASH from "./modules/hashModule";

import ImagesLoader from "./classes/LoaderClass";

import Loader from "./objects2D/LoaderObject2D";
import Menu from "./objects2D/menuObject2D";
import Help from "./objects2D/HelpObject2D";
import Wireframe from "./objects2D/WireframeObject2D";

import helloSection from "./sections/helloSection";
import beamsSection from "./sections/beamsSection";
import dropSection from "./sections/dropSection";
import ballSection from "./sections/ballSection";
import flowSection from "./sections/flowSection";
import neonsSection from "./sections/neonsSection";
import heightSection from "./sections/heightSection";
import waveSection from "./sections/waveSection";
import faceSection from "./sections/faceSection";
import rocksSection from "./sections/rocksSection";
import galaxySection from "./sections/galaxySection";
import gravitySection from "./sections/gravitySection";
import citySection from "./sections/citySection";
import endSection from "./sections/endSection";

console.log("PC page");
jQuery(function() {
  HASH.replacePlaceholders();

  var loader = new Loader();
  var help = new Help();
  var menu = new Menu();
  var imagesLoader = new ImagesLoader([
    require("Assets/img/texture-ball.png"),
    require("Assets/img/texture-ballAlpha.png"),
    require("Assets/img/sprite-smoke.png"),
    require("Assets/img/sprite-AKQA.png")
  ]);

  // preload
  imagesLoader.start();

  imagesLoader.onProgress(function(percent) {
    loader.update(percent);
  });

  imagesLoader.onComplete(function() {
    loader.out();

    TweenLite.delayedCall(0.8, SCENE.in);
    TweenLite.delayedCall(1.5, function() {
      map.in();
      menu.in();
    });
  });

  menu.onClick(function() {
    var $el = jQuery(this);
    var name = $el.attr("data-button") || "";

    if (name === "sounds") {
      SOUNDS.toggle();
      $el.html(SOUNDS.isMuted() ? "UNMUTE" : "MUTE");
    } else if (name === "help") {
      help.in();
    } else if (name === "quality") {
      var text;
      var quality;

      if (SCENE.getQuality() === 0.5) {
        text = "QUALITY 1";
        quality = 1;
      } else {
        text = "QUALITY 0.5";
        quality = 0.5;
      }

      $el.html(text);
      SCENE.quality(quality);
    }
  });

  // scene
  var $heads = jQuery(".heads");
  var $viewport = $heads.find(".heads__viewport");

  SCENE.config({ quality: 1 });
  SCENE.setViewport($viewport);
  SCENE.addSections([
    helloSection,
    beamsSection,
    dropSection,
    ballSection,
    flowSection,
    neonsSection,
    heightSection,
    waveSection,
    faceSection,
    rocksSection,
    galaxySection,
    gravitySection,
    citySection,
    endSection
  ]);

  SCENE.on("section:changeBegin", function() {
    var way = this.way;
    var to = this.to.name;
    var from = this.from.name;

    // in begin
    if (to === "hello") {
      helloSection.in();
      helloSection.start();
      helloSection.smokeStart();

      beamsSection.out("up");
      beamsSection.start();
    } else if (to === "beams") {
      helloSection.smokeStart();

      beamsSection.in();
      beamsSection.start();
    } else if (to === "drop") {
      beamsSection.out("down");
      beamsSection.start();

      dropSection.in();
      dropSection.start();
    } else if (to === "ball") {
      dropSection.out("down");
      dropSection.start();

      ballSection.in();
      ballSection.start();

      flowSection.fieldIn();
      flowSection.start();
    } else if (to === "flow") {
      flowSection.in();
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.smokeStart();
    } else if (to === "neons") {
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.start();
      neonsSection.smokeStart();

      heightSection.show();
    } else if (to === "height") {
      flowSection.fieldIn();
      flowSection.start();

      neonsSection.smokeStart();

      heightSection.show();
      heightSection.in();
      heightSection.start();
    } else if (to === "wave") {
      heightSection.show();

      waveSection.in(way);
      waveSection.start();
    } else if (to === "face") {
      faceSection.in();
      faceSection.start();

      rocksSection.show();
    } else if (to === "rocks") {
      rocksSection.show();
      rocksSection.in();
      rocksSection.start();
    } else if (to === "galaxy") {
      rocksSection.show();

      galaxySection.in(way);
      galaxySection.start();

      gravitySection.show();
    } else if (to === "gravity") {
      gravitySection.show();
      gravitySection.in();
      gravitySection.start();
    } else if (to === "end") {
      endSection.in();
    }

    // out begin
    if (from === "hello") {
      // I dont know the reason, but it works when I commented out it
      // helloSection.out(way);
    } else if (from === "beams") {
      beamsSection.out(way);
    } else if (from === "drop") {
      dropSection.out(way);
    } else if (from === "ball") {
      ballSection.out(way);
    } else if (from === "flow") {
      flowSection.out(way);
    } else if (from === "neons") {
      neonsSection.out(way);
    } else if (from === "height") {
      heightSection.out(way);
    } else if (from === "wave") {
      waveSection.out(way);
    } else if (from === "face") {
      faceSection.out(way);
    } else if (from === "rocks") {
      rocksSection.out(way);
    } else if (from === "galaxy") {
      galaxySection.out(way);
    } else if (from === "gravity") {
      gravitySection.out(way);
    } else if (from === "end") {
      endSection.out(way);
    }
  });

  SCENE.on("section:changeComplete", function() {
    var to = this.to.name;
    var from = this.from.name;

    // out complete
    if (from === "hello") {
      helloSection.stop();

      if (to !== "beams") {
        helloSection.smokeStop();
      }

      if (to !== "beams" && to !== "drop") {
        beamsSection.stop();
      }
    } else if (from === "beams") {
      if (to !== "hello") {
        helloSection.smokeStop();
      }

      if (to !== "hello" && to !== "drop") {
        beamsSection.stop();
      }
    } else if (from === "drop") {
      if (to !== "hello" && to !== "beams") {
        beamsSection.stop();
      }

      if (to !== "ball") {
        dropSection.stop();
      }
    } else if (from === "ball") {
      ballSection.stop();

      if (to !== "drop") {
        dropSection.stop();
      }

      if (to !== "flow" && to !== "neons" && to !== "height") {
        flowSection.stop();
      }
    } else if (from === "flow") {
      if (to !== "neons" && to !== "height") {
        neonsSection.smokeStop();
      }

      if (to !== "ball" && to !== "neons" && to !== "height") {
        flowSection.stop();
      }
    } else if (from === "neons") {
      neonsSection.stop();

      if (to !== "flow" && to !== "height") {
        neonsSection.smokeStop();
      }

      if (to !== "ball" && to !== "flow" && to !== "height") {
        flowSection.stop();
      }

      if (to !== "height" && to !== "wave") {
        heightSection.hide();
      }
    } else if (from === "height") {
      heightSection.stop();

      if (to !== "neons" && to !== "wave") {
        heightSection.hide();
      }

      if (to !== "flow" && to !== "neons") {
        neonsSection.smokeStop();
      }

      if (to !== "ball" && to !== "flow" && to !== "neons") {
        flowSection.stop();
      }
    } else if (from === "wave") {
      waveSection.stop();

      if (to !== "neons" && to !== "height") {
        heightSection.hide();
      }
    } else if (from === "face") {
      faceSection.stop();

      if (to !== "rocks" && to !== "galaxy") {
        rocksSection.hide();
      }
    } else if (from === "rocks") {
      rocksSection.stop();

      if (to !== "face" && to !== "galaxy") {
        rocksSection.hide();
      }
    } else if (from === "galaxy") {
      galaxySection.stop();

      if (to !== "face" && to !== "rocks") {
        rocksSection.hide();
      }

      if (to !== "gravity") {
        gravitySection.hide();
      }
    } else if (from === "gravity") {
      gravitySection.stop();

      if (to !== "galaxy") {
        gravitySection.hide();
      }
    }
  });

  SCENE.on("end", function() {
    SCENE.lock();
    APP.slide(SCENE.unlock);
  });

  // map
  var map = SCENE.getMap();

  $heads.prepend(map.$el);

  map.init();

  map.onClick(function(index) {
    SCENE.goTo(index);
  });

  SCENE.on("section:changeBegin", function() {
    map.setActive(this.to.index);
  });

  // tails
  var wireframe = new Wireframe(jQuery(".wireframe"));

  var $tailsSections = jQuery(".tails__section");
  // $tailsSections.find(".tails__section__el").animate({ opacity: 0, y: 100 }, 0);
  $tailsSections.find(".tails__section__el").css({
    opacity: 0,
    transform: `translateY(100%)`
  });

  var waypoint = $tailsSections.waypoint({
    $viewport: jQuery(".tails"),
    offset: 30
  });

  $tailsSections.on("active", function() {
    var $el = jQuery(this);

    if ($el.attr("data-appeared")) {
      return false;
    }

    // TODO find the reason why it dosen't work
    // it seems that somgthing's wrong in waypointLib.js

    jQuery(this)
      .find(".tails__section__el")
      .each(function(i) {
        jQuery(this)
          .stop()
          .delay(i * 100)
          .css({
            opacity: 1,
            transform: `translateY(0%)`,
            transition: `all 500ms`
          });
      });

    $el.attr("data-appeared", true);
  });

  jQuery(".tails__section--site").on("stateChange", function(e, state) {
    if (state === "active") {
      wireframe.start();
      wireframe.in();
    } else {
      wireframe.stop();
    }
  });

  APP.on("slideBegin", function() {
    if (this.to === "heads") {
      waypoint.stop();

      try {
        SOUNDS.background.fade(0, 1, 2000);
      } catch (e) {
        console.warn(e);
      }
    } else {
      SOUNDS.background.fade(1, 0, 2000);
    }
  });

  APP.on("slideComplete", function() {
    if (this.to === "tails") {
      waypoint.start();
    }
  });

  // SCENE on/off
  APP.on("heads:visible", function() {
    SCENE.start();
  });

  APP.on("heads:invisible", function() {
    SCENE.stop();
  });

  APP.start();
  SCENE.start();

  SOUNDS.background.fade(0, 1, 2000);
});
