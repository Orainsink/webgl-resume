"use strict";

import BackgroundLines from "./BackgroundLinesObject3D";

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
    akqa: require("Assets/img/sprite-AKQA.png"),
    hki: require("Assets/img/sprite-HKI.png"),
    grouek: require("Assets/img/sprite-grouek.png"),
    mediamonks: require("Assets/img/sprite-mediamonks.png"),
    none: require("Assets/img/sprite-none.png"),
    soleilnoir: require("Assets/img/sprite-soleilnoir.png"),
    thread: require("Assets/img/sprite-thread.png"),
    ultranoir: require("Assets/img/sprite-ultranoir.png")
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
    inTween.play();
  };

  this.out = function() {
    inTween.reverse();
  };

  this.start = function() {
    sprite.start();
  };

  this.stop = function() {
    sprite.stop();
  };
}

export default Title;
