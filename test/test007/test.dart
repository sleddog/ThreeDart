// Copyright (c) 2016, SnowGremlin. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

library ThreeDart.test.test007;

import 'dart:html';

import 'package:ThreeDart/ThreeDart.dart' as ThreeDart;
import 'package:ThreeDart/Shapes.dart' as Shapes;
import 'package:ThreeDart/Movers.dart' as Movers;
import 'package:ThreeDart/Math.dart' as Math;
import 'package:ThreeDart/Techniques.dart' as Techniques;
import 'package:ThreeDart/Scenes.dart' as Scenes;
import 'package:ThreeDart/Lights.dart' as Lights;
import 'package:ThreeDart/Textures.dart' as Textures;
import '../common/common.dart' as common;

void main() {
  common.shellTest("Test 007", [],
    "A test of the Material Lighting shader with bumpy 2D textures and "+
    "a directional light. The lighting and bump is being applied to "+
    "ambient, diffuse, and specular 2D texturing.");

  ThreeDart.ThreeDart td = new ThreeDart.ThreeDart.fromId("threeDart");

  ThreeDart.Entity obj = new ThreeDart.Entity()
    ..shape = Shapes.cube()
    ..mover = (new Movers.Group()
      ..add(new Movers.UserRotater(input: td.userInput))
      ..add(new Movers.UserRoller(input: td.userInput, ctrl: true))
      ..add(new Movers.UserZoom(input: td.userInput)));

  Textures.Texture2D color = td.textureLoader.load2DFromFile("../resources/ScrewColor.png");
  Techniques.MaterialLight tech = new Techniques.MaterialLight()
    ..lights.add(new Lights.Directional(
          mover: new Movers.Constant(new Math.Matrix4.vectorTowards(0.0, 0.0, -1.0)),
          color: new Math.Color3.white()))
    ..ambient.color = new Math.Color3(0.2, 0.2, 0.2)
    ..diffuse.color = new Math.Color3(0.8, 0.8, 0.8)
    ..ambient.texture2D = color
    ..diffuse.texture2D = color
    ..bump.texture2D = td.textureLoader.load2DFromFile("../resources/ScrewBumpMap.png")
    ..specular.color = new Math.Color3.white()
    ..specular.texture2D = td.textureLoader.load2DFromFile("../resources/ScrewSpecular.png")
    ..specular.shininess = 10.0;

  td.scene = new Scenes.EntityPass()
    ..technique = tech
    ..children.add(obj)
    ..camera.mover = new Movers.Constant(new Math.Matrix4.translate(0.0, 0.0, 5.0));

  var update;
  update = (num t) {
    td.render();
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
}
