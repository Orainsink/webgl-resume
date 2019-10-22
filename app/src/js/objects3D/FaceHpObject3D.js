"use strict";

const THREE = require("three");
require("../utils/legacyJSONLoaderUtil");
import { TweenLite } from "gsap/TweenMax";

import yoyo from "../utils/yoyoUtil";

import matCap from "../materials/matCapMaterial";
matCap.uniforms.map.value = new THREE.TextureLoader().load(
  require("Public/img/matCap-shiny.jpg")
);

/**
 * 3D face
 *
 * @class Face
 * @constructor
 * @requires THREE, TweenLite, random, yoyo, matCap
 */
function Face() {
  var group = new THREE.Object3D();

  var loader = new THREE.LegacyJSONLoader();
  loader.load(
    "../public/3D/face-hp.json",
    function(geometry) {
      var mesh = new THREE.Mesh(geometry, matCap);
      mesh.scale.x = 1.5;
      mesh.scale.y = 1.5;

      group.add(mesh);

      var idleTween = TweenLite.to({ y: -0.2 }, 2, {
        y: 0.2,
        paused: true,
        onUpdate: function() {
          mesh.rotation.y = this.target.y;
        },
        onComplete: yoyo,
        onReverseComplete: yoyo
      });

      this.in = function() {
        TweenLite.to(mesh.rotation, 1.5, { x: 0 });
      };

      this.out = function(way) {
        var x = way === "up" ? -1 : 1;
        TweenLite.to(mesh.rotation, 1.5, { x: x });
      };

      this.start = function() {
        idleTween.resume();
      };

      this.stop = function() {
        idleTween.pause();
      };
    }.bind(this)
  );

  this.el = group;

  this.start = function() {};

  this.stop = this.start;

  this.in = this.start;

  this.out = this.start;
}

export default Face;
