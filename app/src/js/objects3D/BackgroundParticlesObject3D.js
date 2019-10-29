"use strict";

import * as THREE from "three";

import random from "../utils/randomUtil";

/**
 * Background floating particles/strips
 *
 * @class BackgroundParticles
 * @constructor
 * @param {Object} [options]
 * @param {Object} [strips=true] Strips?
 * @param {Number} [options.count=1000] Number of particles
 * @param {Number} [options.particleSize=0.5] Size of a particle
 * @param {Array} [options.rangeY=[-100, 100]] Y range for positions
 * @requires jQuery, THREE, random
 */
class BackgroundParticles {
  constructor(options) {
    const parameters = jQuery.extend(
      BackgroundParticles.defaultOptions,
      options
    );

    let material = new THREE.PointsMaterial({
      size: parameters.particleSize
    });

    let geometry = new THREE.Geometry();

    for (let i = 0; i < parameters.count; i++) {
      let particle = new THREE.Vector3(
        random(-50, 50),
        random(parameters.rangeY[0], parameters.rangeY[1]),
        random(-50, 100)
      );

      geometry.vertices.push(particle);
    }

    let group = new THREE.Object3D();

    group.add(new THREE.Points(geometry, material));

    if (parameters.strips) {
      let stripsGeometry = new THREE.Geometry();

      let stripGeometry = new THREE.PlaneGeometry(5, 2);
      let stripMaterial = new THREE.MeshLambertMaterial({ color: "#666666" });

      for (let i = 0; i < parameters.stripsCount; i++) {
        let stripMesh = new THREE.Mesh(stripGeometry, stripMaterial);
        stripMesh.position.set(
          random(-50, 50),
          random(parameters.rangeY[0], parameters.rangeY[1]),
          random(-50, 0)
        );

        stripMesh.scale.set(random(0.5, 1), random(0.1, 1), 1);

        stripMesh.updateMatrix();

        stripsGeometry.merge(stripMesh.geometry, stripMesh.matrix);
      }

      let totalMesh = new THREE.Mesh(stripsGeometry, stripMaterial);

      group.add(totalMesh);
    }

    this.el = group;
  }
}

BackgroundParticles.defaultOptions = {
  count: 1000,
  particleSize: 0.5,
  rangeY: [-100, 100],
  strips: true,
  stripsCount: 20
};

export default BackgroundParticles;
