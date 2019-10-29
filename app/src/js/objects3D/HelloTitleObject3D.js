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
class Title {
  constructor() {
    let path;

    let sprites = {
      none: require("Assets/img/sprite-none.png")
    };

    if (sprites[HASH.hash]) {
      path = sprites[HASH.hash];
    } else {
      path = sprites.none;
    }

    let texture = new THREE.TextureLoader().load(path);
    texture.flipY = true;

    let sprite = new SPRITE3D.Sprite(texture, {
      horizontal: 4,
      vertical: 10,
      total: 40,
      duration: 70,
      loop: true
    });

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      depthWrite: false,
      depthTest: true,
      transparent: true
    });

    let geometry = new THREE.PlaneGeometry(30, 15);
    let plane = new THREE.Mesh(geometry, material);

    function update() {
      plane.position.y = cache.y;
      material.opacity = cache.opacity;
    }

    let cache = { y: 20, opacity: 0 };
    let inTween = TweenLite.to(cache, 1, {
      y: 0,
      opacity: 1,
      paused: true,
      onUpdate: update
    });

    this.el = plane;

    this.in = function() {
      // something went wrong here
      inTween.play();
    };

    this.out = function() {
      // inTween.reverse();
    };

    this.start = function() {
      sprite.start();
    };

    this.stop = function() {
      sprite.stop();
    };
  }
}
export default Title;
