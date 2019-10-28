"use strict";

import * as THREE from "three";
import { TweenLite } from "gsap/TweenMax";

import SPRITE3D from "../libs/sprite3DLib";
import HASH from "../modules/hashModule";

/**
 * Hello title
 *
 * @class Title
 * @constructor
 * @requires THREE, TweenLite, SPRITE3D, HASH
 */
function Title() {
  var path;

  var sprites = {
    none: require("Assets/img/sprite-none.png")
  };

  if (sprites[HASH.hash]) {
    path = sprites[HASH.hash];
  } else {
    path = sprites.none;
  }

  var texture = new THREE.TextureLoader().load(path);
  texture.flipY = true;

  var sprite = new SPRITE3D.Sprite(texture, {
    horizontal: 4,
    vertical: 10,
    total: 40,
    duration: 70,
    loop: true
  });

  var material = new THREE.MeshBasicMaterial({
    map: texture,
    depthWrite: false,
    depthTest: true,
    transparent: true
  });

  var geometry = new THREE.PlaneGeometry(30, 15);
  var plane = new THREE.Mesh(geometry, material);

  function update() {
    plane.position.y = cache.y;
    material.opacity = cache.opacity;
  }

  var cache = { y: 20, opacity: 0 };
  var inTween = TweenLite.to(cache, 1, {
    y: 0,
    opacity: 1,
    paused: true,
    onUpdate: update
  });

  this.el = plane;

  this.in = function() {
    console.log("in");
    // something went wrong here
    inTween.play();
  };

  this.out = function() {
    console.log("out");
    // inTween.reverse();
  };

  this.start = function() {
    console.log("start");
    sprite.start();
  };

  this.stop = function() {
    console.log("stop");
    sprite.stop();
  };
}

export default Title;
