"use strict";

import Section from "../classes/SectionClass";

import TextPanel from "../objects3D/TextPanelObject3D";
import Rocks from "../objects3D/RocksObject3D";

var rocksSection = new Section("rocks");

var rocks = new Rocks();
rocksSection.add(rocks.el);

var text = new TextPanel("K  E  E  P  \n  L  E  A  R  N  I  N  G", {
  align: "center",
  style: "",
  size: 50,
  lineSpacing: 40
});
text.el.position.set(0, 0, 0);
rocksSection.add(text.el);
text.out("down");

rocks.el.visible = false;

rocksSection.onIn(function() {
  text.in();
  rocks.in();
});

rocksSection.onOut(function(way) {
  text.out("down");
  rocks.out(way);
});

rocksSection.onStart(function() {
  rocks.start();
});

rocksSection.onStop(function() {
  rocks.stop();
});

rocksSection.show = function() {
  rocks.el.visible = true;
};

rocksSection.hide = function() {
  rocks.el.visible = false;
};

export default rocksSection;
