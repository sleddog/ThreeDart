// Copyright (c) 2016, SnowGremlin. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

library ThreeDart.test.test016;

import 'dart:html';

import 'package:ThreeDart/ThreeDart.dart' as ThreeDart;
import 'package:ThreeDart/Shapes.dart' as Shapes;
import 'package:ThreeDart/Movers.dart' as Movers;
import 'package:ThreeDart/Math.dart' as Math;
import 'package:ThreeDart/Techniques.dart' as Techniques;
import 'package:ThreeDart/Textures.dart' as Textures;
import 'package:ThreeDart/Scenes.dart' as Scenes;
import 'package:ThreeDart/Lights.dart' as Lights;
import 'package:ThreeDart/Views.dart' as Views;
import '../common/common.dart' as common;

void main() {
  common.shellTest("Test 016", [],
    "A test of the Material Lighting shader with cube texturing, "+
    "bump mapping, and a color directional light.");

  ThreeDart.ThreeDart td = new ThreeDart.ThreeDart.fromId("threeDart");

  Views.FrontTarget target = new Views.FrontTarget()
    ..clearColor = false;

  ThreeDart.Entity obj = new ThreeDart.Entity()
    ..shape = Shapes.cube();

  Textures.TextureCube environment =
    td.textureLoader.loadCubeFromPath("../resources/maskonaive", ext: ".jpg");
  Textures.TextureCube color = td.textureLoader.loadCubeFromPath("../resources/diceColor");
  Techniques.MaterialLight tech = new Techniques.MaterialLight()
    ..lights.add(new Lights.Directional(
          mover: new Movers.Constant(new Math.Matrix4.vectorTowards(1.0, -1.0, -3.0)),
          color: new Math.Color3.white()))
    ..ambient.color = new Math.Color3(0.2, 0.2, 0.2)
    ..diffuse.color = new Math.Color3(0.7, 0.7, 0.7)
    ..specular.color = new Math.Color3(0.7, 0.7, 0.7)
    ..ambient.textureCube = color
    ..diffuse.textureCube = color
    ..specular.textureCube = td.textureLoader.loadCubeFromPath("../resources/diceSpecular")
    ..specular.shininess = 10.0
    ..bump.textureCube = td.textureLoader.loadCubeFromPath("../resources/diceBumpMap")
    ..environment = environment
    ..reflection.color = new Math.Color3(0.3, 0.3, 0.3);

  Movers.Group mover = new Movers.Group()
    ..add(new Movers.UserRotater(input: td.userInput))
    ..add(new Movers.UserRoller(input: td.userInput, ctrl: true))
    ..add(new Movers.UserZoom(input: td.userInput))
    ..add(new Movers.Constant(new Math.Matrix4.translate(0.0, 0.0, 5.0)));

  Views.Perspective camera = new Views.Perspective(mover: mover);

  Scenes.CoverPass skybox = new Scenes.CoverPass.skybox(environment)
    ..target = target
    ..camera = camera;

  Scenes.EntityPass pass = new Scenes.EntityPass()
    ..camera = camera
    ..tech = tech
    ..target = target
    ..children.add(obj);
  (pass.target as Views.FrontTarget).clearColor = false;

  td.scene = new Scenes.Compound(passes: [skybox, pass]);

  var update;
  update = (num t) {
    td.render();
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
}
