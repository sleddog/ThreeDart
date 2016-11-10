// Copyright (c) 2016, SnowGremlin. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

library ThreeDart.test.test018;

import 'dart:html';

import 'package:ThreeDart/ThreeDart.dart' as ThreeDart;
import 'package:ThreeDart/Shapes.dart' as Shapes;
import 'package:ThreeDart/Movers.dart' as Movers;
import 'package:ThreeDart/Math.dart' as Math;
import 'package:ThreeDart/Techniques.dart' as Techniques;
import 'package:ThreeDart/Textures.dart' as Textures;
import 'package:ThreeDart/Scenes.dart' as Scenes;
import 'package:ThreeDart/Lights.dart' as Lights;
import '../common/common.dart' as common;

void main() {
  common.shellTest("Test 018", ["shapes"],
    "A test of the Material Lighting shader where a diffuse textue and "+
    "inverse diffuse texture are used. Grass is only shown in the dark. "+
    "Dirt is shown where the directional light is shining.");

  ThreeDart.ThreeDart td = new ThreeDart.ThreeDart.fromId("threeDart");

  ThreeDart.Entity obj = new ThreeDart.Entity()
    ..shape = Shapes.sphere()
    ..mover = (new Movers.Group()
      ..add(new Movers.UserRotater(input: td.userInput))
      ..add(new Movers.UserRoller(input: td.userInput, ctrl: true))
      ..add(new Movers.UserZoom(input: td.userInput)));

  Textures.Texture2D diffuse = td.textureLoader.load2DFromFile("../resources/Dirt.png");
  Textures.Texture2D invDiffuse = td.textureLoader.load2DFromFile("../resources/Grass.png");
  Techniques.MaterialLight tech = new Techniques.MaterialLight()
    ..lights.add(new Lights.Directional(
          mover: new Movers.Constant(new Math.Matrix4.vectorTowards(-1.0, -1.0, -1.0)),
          color: new Math.Color3.white()))
    ..diffuse.texture2D = diffuse
    ..invDiffuse.texture2D = invDiffuse;

  td.scene = new Scenes.EntityPass()
    ..tech = tech
    ..children.add(obj)
    ..camera.mover = new Movers.Constant(new Math.Matrix4.translate(0.0, 0.0, 3.0));

  new common.RadioGroup("shapes")
    ..add("Cube",         () { obj.shape = Shapes.cube(); })
    ..add("Cuboid",       () { obj.shape = Shapes.cuboid(); })
    ..add("Cylinder",     () { obj.shape = Shapes.cylinder(sides: 40); })
    ..add("Cone",         () { obj.shape = Shapes.cylinder(topRadius: 0.0, sides: 40, capTop: false); })
    ..add("LatLonSphere", () { obj.shape = Shapes.latLonSphere(10, 20); })
    ..add("IsoSphere",    () { obj.shape = Shapes.isosphere(2); })
    ..add("Sphere",       () { obj.shape = Shapes.sphere(widthDiv: 6, heightDiv: 6); }, true )
    ..add("Toroid",       () { obj.shape = Shapes.toroid(); })
    ..add("Knot",         () { obj.shape = Shapes.knot(); });

  var update;
  update = (num t) {
    td.render();
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
}
