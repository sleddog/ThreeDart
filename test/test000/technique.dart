part of ThreeDart.test.test000;

void addTechniqueTests(TestManager tests) {

  tests.add("Matrix4 Point Transposition Test", (TestArgs args) {
    testTechnique(args,
      new Math.Matrix4.identity(),
      new Math.Matrix4.translate(0.0, 0.0, -5.0),
      [new pointPair( 0.0,  0.0,  0.0,    0.0,  0.0,  0.0),
       new pointPair( 1.0,  0.0,  0.0,    1.0,  0.0,  0.0),
       new pointPair(-1.0,  0.0,  0.0,   -1.0,  0.0,  0.0),
       new pointPair( 0.0,  1.0,  0.0,    0.0,  1.0,  0.0),
       new pointPair( 0.0, -1.0,  0.0,    0.0, -1.0,  0.0),
       new pointPair( 0.0,  0.0,  1.0,    0.0,  0.0,  1.0),
       new pointPair( 0.0,  0.0, -1.0,    0.0,  0.0, -1.0),
       new pointPair( 1.0,  1.0,  1.0,    1.0,  1.0,  1.0),
       new pointPair( 1.0, -1.0,  1.0,    1.0, -1.0,  1.0),
       new pointPair( 1.0,  1.0, -1.0,    1.0,  1.0, -1.0),
       new pointPair( 1.0, -1.0, -1.0,    1.0, -1.0, -1.0),
       new pointPair(-1.0,  1.0,  1.0,   -1.0,  1.0,  1.0),
       new pointPair(-1.0, -1.0,  1.0,   -1.0, -1.0,  1.0),
       new pointPair(-1.0,  1.0, -1.0,   -1.0,  1.0, -1.0),
       new pointPair(-1.0, -1.0, -1.0,   -1.0, -1.0, -1.0)]);
  });
}

class pointPair {
  Math.Point3 inPoint;
  Math.Point3 outPoint;

  pointPair(double inX, double inY, double inZ,
            double outX, double outY, double outZ) {
    this.inPoint = new Math.Point3(inX, inY, inZ);
    this.outPoint = new Math.Point3(outX, outY, outZ);
  }
}

void testTechnique(TestArgs args, Math.Matrix4 objMat, Math.Matrix4 camMat, List<pointPair> pairs) {
  Shapes.Shape shape = new Shapes.Shape();
  for (int i = 0; i < pairs.length; i++)
    shape.vertices.addNew(loc: pairs[i].inPoint);

  ThreeDart.Entity obj = new ThreeDart.Entity()
    ..shape = shape
    ..mover = new Movers.Constant(objMat);

  StringBuffer buf = new StringBuffer();
  Techniques.Debugger tech = new Techniques.Debugger(buf);
  Scenes.RenderPass pass = new Scenes.RenderPass()
    ..tech = tech
    ..children.add(obj)
    ..camara.mover = new Movers.Constant(camMat);

  new ThreeDart.ThreeDart.fromCanvas(new html.CanvasElement())
    ..scene = pass;

  args.info(buf.toString());

  if (tech.results.length != pairs.length) {
    String result = "";
    for (int i = 0; i < tech.results.length; i++) {
      result += "\n   " + tech.results[i].toString(1, 3);
    }
    String expStr = "";
    for (int i = 0; i < pairs.length; i++) {
      expStr += "\n   " + pairs[i].outPoint.toString(1, 3);
    }
    args.error("Unexpected number of results from debugging technique: " +
      "\n   Expected: $expStr" +
      "\n   Gotten:   $result\n\n");
    args.fail();
  } else {
    for (int i = 0; i < tech.results.length; i++) {
      Math.Point3 expPnt = pairs[i].outPoint;
      Math.Point3 result = tech.results[i];
      if (expPnt != result) {
        args.error("Unexpected result from debugging technique at $i: " +
          "\n   Expected: $expPnt" +
          "\n   Gotten:   $result\n\n");
      }
    }
  }
}
