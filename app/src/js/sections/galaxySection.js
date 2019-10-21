"use strict";

import Section from "../classes/SectionClass";

import TextPanel from "../objects3D/TextPanelObject3D";
import Galaxy from "../objects3D/GalaxyObject3D";

var galaxySection = new Section("galaxy");

var galaxy = new Galaxy();
galaxy.el.rotation.x = -1;
galaxySection.add(galaxy.el);

galaxy.el.visible = false;

var text = new TextPanel("W  O  R  K \n A  S    A    T  E  A  M", {
  align: "center",
  style: "",
  size: 50,
  lineSpacing: 40
});
text.el.position.set(0, 20, -20);
galaxySection.add(text.el);

galaxySection.onIn(function(way) {
  galaxy.in(way);
  text.in();
});

galaxySection.onOut(function(way) {
  galaxy.out(way);
  text.out(way);
});

galaxySection.onStart(function() {
  galaxy.start();

  galaxy.el.visible = true;
});

galaxySection.onStop(function() {
  galaxy.stop();

  galaxy.el.visible = false;
});

export default galaxySection;
