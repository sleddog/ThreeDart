part of ThreeDart.Shapes;

typedef double func1Handle(double a);

typedef double func2Handle(double a, double b);

typedef Math.Point3 func1PntHandle(double a);

typedef Math.Point3 func2PntHandle(double a, double b);

Shape square() {
  Shape shape = new Shape();
  Vertex ver1 = shape.vertices.addNew(
    loc:  new Math.Point3(-1.0, -1.0, 0.0),
    norm: new Math.Vector3(0.0, 0.0, 1.0),
    txt:  new Math.Point2(0.0, 0.0),
    clr:  new Math.Color4(1.0, 0.0, 0.0, 1.0));

  Vertex ver2 = shape.vertices.addNew(
    loc:  new Math.Point3(-1.0, 1.0, 0.0),
    norm: new Math.Vector3(0.0, 0.0, 1.0),
    txt:  new Math.Point2(0.0, 1.0),
    clr:  new Math.Color4(1.0, 1.0, 0.0, 1.0));

  Vertex ver3 = shape.vertices.addNew(
    loc:  new Math.Point3(1.0, 1.0, 0.0),
    norm: new Math.Vector3(0.0, 0.0, 1.0),
    txt:  new Math.Point2(1.0, 1.0),
    clr:  new Math.Color4(0.0, 1.0, 0.0, 1.0));

  Vertex ver4 = shape.vertices.addNew(
    loc:  new Math.Point3(1.0, -1.0, 0.0),
    norm: new Math.Vector3(0.0, 0.0, 1.0),
    txt:  new Math.Point2(1.0, 0.0),
    clr:  new Math.Color4(0.0, 0.0, 1.0, 1.0));

  shape.faces.addFan([ver1, ver2, ver3, ver4]);
  return shape;
}

Shape cube() {
  Shape shape = new Shape();
  _addCubeSide(shape,  1.0,  0.0,  0.0); // x+
  _addCubeSide(shape, -1.0,  0.0,  0.0); // X-
  _addCubeSide(shape,  0.0,  1.0,  0.0); // Y+
  _addCubeSide(shape,  0.0, -1.0,  0.0); // Y-
  _addCubeSide(shape,  0.0,  0.0,  1.0); // Z+
  _addCubeSide(shape,  0.0,  0.0, -1.0); // Z-
  return shape;
}

void _addCubeSide(Shape shape, double nx, double ny, double nz) {
  Vertex ver1 = shape.vertices.addNew(
    loc:  new Math.Point3(nx+ny+nz, ny+nz+nx, nz+nx+ny),
    norm: new Math.Vector3(nx, ny, nz),
    txt:  new Math.Point2(0.0, 0.0),
    clr:  new Math.Color4(nx+ny+nz, ny+nz+nx, nz+nx+ny, 1.0));

  Vertex ver2 = shape.vertices.addNew(
    loc:  new Math.Point3(nx-ny+nz, ny-nz+nx, nz-nx+ny),
    norm: new Math.Vector3(nx, ny, nz),
    txt:  new Math.Point2(0.0, 1.0),
    clr:  new Math.Color4(nx-ny+nz, ny-nz+nx, nz-nx+ny, 1.0));

  Vertex ver3 = shape.vertices.addNew(
    loc:  new Math.Point3(nx+ny-nz, ny+nz-nx, nz+nx-ny),
    norm: new Math.Vector3(nx, ny, nz),
    txt:  new Math.Point2(1.0, 0.0),
    clr:  new Math.Color4(nx+ny-nz, ny+nz-nx, nz+nx-ny, 1.0));

  Vertex ver4 = shape.vertices.addNew(
    loc:  new Math.Point3(nx-ny-nz, ny-nz-nx, nz-nx-ny),
    norm: new Math.Vector3(nx, ny, nz),
    txt:  new Math.Point2(1.0, 1.0),
    clr:  new Math.Color4(nx-ny-nz, ny-nz-nx, nz-nx-ny, 1.0));

  if (nx+ny+nz > 0.0) {
    shape.faces.addFan([ver1, ver2, ver4, ver3]);
  } else {
    shape.faces.addFan([ver1, ver3, ver4, ver2]);
  }
}

Shape disk({int sides: 8, double height: 0.0, bool flip: true, func1Handle radiusHndl: _constantRediusHandle}) {
  if (sides < 3) return null;
  Shape shape = new Shape();
  double sign = flip? -1.0: 1.0;
  double step = 2.0*PI/sides.toDouble();
  List<Vertex> vers = new List<Vertex>();
  vers.add(shape.vertices.addNew(
    loc:  new Math.Point3(0.0, height, 0.0),
    norm: new Math.Vector3(0.0, -sign, 0.0),
    txt:  new Math.Point2(0.5, 0.5),
    clr:  new Math.Color4(1.0, 1.0, 1.0)));
  for (int i = 0; i <= sides; i++) {
    double angle = step*i.toDouble();
    double x = sign*sin(angle), z = cos(angle);
    double radius = radiusHndl(i.toDouble()/sides.toDouble());
    vers.add(shape.vertices.addNew(
      loc:  new Math.Point3(x*radius, height, z*radius),
      norm: new Math.Vector3(0.0, -sign, 0.0),
      txt:  new Math.Point2(x*0.5+0.5, z*0.5+0.5),
      clr:  new Math.Color4(x, z, z)));
  }
  shape.faces.addFan(vers);
  return shape;
}

double _constantRediusHandle(double a) => 1.0;

Shape cylinder({double topRadius: 1.0, double bottomRadius: 1.0,
    int sides: 8, int div: 1, bool capTop: true, bool capBottom: true}) {
  return cylindical(sides: sides, div: div, capTop: capTop, capBottom: capBottom,
    radiusHndl: (double _, double v) => Math.lerpVal(bottomRadius, topRadius, v));
}

Shape cylindical({func2Handle radiusHndl: null, int sides: 8, int div: 1, bool capTop: true, bool capBottom: true}) {
  if (radiusHndl == null)  return null;
  if (sides < 3) return null;
  if (div < 1) return null;
  Shape shape = surface(div, sides, (double u, double v) {
    double angle = 2.0*PI*u;
    double x = -sin(angle), z = cos(angle);
    double y = Math.lerpVal(-1.0, 1.0, v);
    double radius = radiusHndl(u, v);
    return new Math.Point3(x*radius, y, z*radius);
  });
  if (shape == null) return null;
  shape.calculateNormals();
  shape.adjustNormals();
  if (capTop) {
    Shape top = disk(sides: sides, height: 1.0, flip: true,
      radiusHndl: (double u) => radiusHndl(u, 1.0));
    shape.merge(top);
  }
  if (capBottom) {
    Shape bottom = disk(sides: sides, height: -1.0, flip: false,
      radiusHndl: (double u) => radiusHndl(1.0-u, 0.0));
    shape.merge(bottom);
  }
  return shape;
}

Shape latLonSphere([int latitudeDiv = 12, int longitudeDiv = 24]) {
  Shape shape = surface(latitudeDiv, longitudeDiv, (double u, double v) {
    double r = sin(v*PI);
    Math.Vector3 vec = new Math.Vector3(-cos(u*2.0*PI)*r,
                                        cos(v*PI),
                                        sin(u*2.0*PI)*r);
    return new Math.Point3.fromVector3(vec.normal());
  });
  shape.faces.removeCollapsed();
  shape.calculateNormals();
  shape.adjustNormals();
  return shape;
}

Shape isosphere([int iterations = 3]) {
  Shape shape = new Shape();
  // Ceate 12 vertices of a icosahedron.
  var t = sqrt(5.0)/2.0 + 0.5;
  Vertex ver0  = _isosphereAdd(shape, new Math.Vector3(-1.0,  t,  0.0));
  Vertex ver1  = _isosphereAdd(shape, new Math.Vector3( 1.0,  t,  0.0));
  Vertex ver2  = _isosphereAdd(shape, new Math.Vector3(-1.0, -t,  0.0));
  Vertex ver3  = _isosphereAdd(shape, new Math.Vector3( 1.0, -t,  0.0));

  Vertex ver4  = _isosphereAdd(shape, new Math.Vector3( 0.0, -1.0,  t));
  Vertex ver5  = _isosphereAdd(shape, new Math.Vector3( 0.0,  1.0,  t));
  Vertex ver6  = _isosphereAdd(shape, new Math.Vector3( 0.0, -1.0, -t));
  Vertex ver7  = _isosphereAdd(shape, new Math.Vector3( 0.0,  1.0, -t));

  Vertex ver8  = _isosphereAdd(shape, new Math.Vector3( t,  0.0, -1.0));
  Vertex ver9  = _isosphereAdd(shape, new Math.Vector3( t,  0.0,  1.0));
  Vertex ver10 = _isosphereAdd(shape, new Math.Vector3(-t,  0.0, -1.0));
  Vertex ver11 = _isosphereAdd(shape, new Math.Vector3(-t,  0.0,  1.0));

  _isoSphereDiv(shape, ver0,  ver11, ver5,  iterations);
  _isoSphereDiv(shape, ver0,  ver5,  ver1,  iterations);
  _isoSphereDiv(shape, ver0,  ver1,  ver7,  iterations);
  _isoSphereDiv(shape, ver0,  ver7,  ver10, iterations);
  _isoSphereDiv(shape, ver0,  ver10, ver11, iterations);

  _isoSphereDiv(shape, ver1,  ver5,  ver9,  iterations);
  _isoSphereDiv(shape, ver5,  ver11, ver4,  iterations);
  _isoSphereDiv(shape, ver11, ver10, ver2,  iterations);
  _isoSphereDiv(shape, ver10, ver7,  ver6,  iterations);
  _isoSphereDiv(shape, ver7,  ver1,  ver8,  iterations);

  _isoSphereDiv(shape, ver3,  ver9,  ver4,  iterations);
  _isoSphereDiv(shape, ver3,  ver4,  ver2,  iterations);
  _isoSphereDiv(shape, ver3,  ver2,  ver6,  iterations);
  _isoSphereDiv(shape, ver3,  ver6,  ver8,  iterations);
  _isoSphereDiv(shape, ver3,  ver8,  ver9,  iterations);

  _isoSphereDiv(shape, ver4,  ver9,  ver5,  iterations);
  _isoSphereDiv(shape, ver2,  ver4,  ver11, iterations);
  _isoSphereDiv(shape, ver6,  ver2,  ver10, iterations);
  _isoSphereDiv(shape, ver8,  ver6,  ver7,  iterations);
  _isoSphereDiv(shape, ver9,  ver8,  ver1,  iterations);

  shape.joinSeams();
  return shape;
}

Vertex _isosphereAdd(Shape shape, Math.Vector3 norm) {
  norm = norm.normal();
  Vertex ver = new Vertex(loc: new Math.Point3.fromVector3(norm), norm: norm);
  Vertex last = shape.findFirst(ver, new LocationMatcher());
  if (last != null) return last;

  ver.color = new Math.Color4(norm.dx*0.5 + 0.5, norm.dy*0.5 + 0.5, norm.dz*0.5 + 0.5);
  double w = sqrt(norm.dx*norm.dx + norm.dy*norm.dy);
  double tu = atan2(norm.dy, norm.dx)*0.5/PI;
  if (tu < 0) tu = -tu;
  double tv = atan2(w, norm.dz)/PI;
  if (tv < 0) tv = -tv;
  ver.texture = new Math.Point2(tu, tv);
  shape.vertices.add(ver);
  return ver;
}

void _isoSphereDiv(Shape shape, Vertex ver1, Vertex ver2, Vertex ver3, iteration) {
  //         2                  2
  //         .                  .
  //        / \                / \
  //       /   \              /B  \
  //      /     \     =>   4 /_____\ 5
  //     /       \          /\ C  / \
  //    /         \        /A \  /D  \
  //   /___________\      /____\/_____\
  //  1             3    1      6      3
  if (iteration <= 0) {
    shape.faces.add(ver1, ver3, ver2);
  } else {
    Vertex ver4 = _isosphereAdd(shape, (ver1.normal + ver2.normal)*0.5);
    Vertex ver5 = _isosphereAdd(shape, (ver2.normal + ver3.normal)*0.5);
    Vertex ver6 = _isosphereAdd(shape, (ver3.normal + ver1.normal)*0.5);
    _isoSphereDiv(shape, ver1, ver4, ver6, iteration-1); // A
    _isoSphereDiv(shape, ver4, ver2, ver5, iteration-1); // B
    _isoSphereDiv(shape, ver5, ver6, ver4, iteration-1); // C
    _isoSphereDiv(shape, ver6, ver5, ver3, iteration-1); // D
  }
}

Shape sphere({int widthDiv: 8, int heightDiv: 8, func2Handle heightHndl: _flatGridHeightHandle}) {
  Shape shape = new Shape();
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv,  1.0,  0.0,  0.0);
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv,  0.0,  1.0,  0.0);
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv,  0.0,  0.0,  1.0);
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv, -1.0,  0.0,  0.0);
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv,  0.0, -1.0,  0.0);
  _addSphereSide(shape, heightHndl, widthDiv, heightDiv,  0.0,  0.0, -1.0);
  shape.calculateNormals();
  shape.adjustNormals();
  return shape;
}

void _addSphereSide(Shape shape, func2Handle heightHndl, int widthDiv, int heightDiv, double nx, double ny, double nz) {
  Math.Vector3 vec1 = new Math.Vector3(nx+ny+nz, ny+nz+nx, nz+nx+ny);
  Math.Vector3 vec2 = new Math.Vector3(nx-ny+nz, ny-nz+nx, nz-nx+ny);
  Math.Vector3 vec3 = new Math.Vector3(nx-ny-nz, ny-nz-nx, nz-nx-ny);
  Math.Vector3 vec4 = new Math.Vector3(nx+ny-nz, ny+nz-nx, nz+nx-ny);
  if (nx+ny+nz <= 0.0) {
    Math.Vector3 t = vec4;
    vec4 = vec2;
    vec2 = t;
  }
  Shape face = surface(widthDiv, heightDiv, (double u, double v) {
    Math.Vector3 vec5 = vec1.lerp(vec2, u);
    Math.Vector3 vec6 = vec4.lerp(vec3, u);
    Math.Vector3 vec7 = vec5.lerp(vec6, v);
    double height = 1.0+heightHndl(u, v);
    return new Math.Point3.fromVector3(vec7.normal()*height);
  });
  if (face != null) shape.merge(face);
}

Shape toroid({double minorRadius: 0.5, double majorRadius: 1.0, int minorCount: 15, int majorCount: 30}) {
  return cylindicalPath(minorCount, majorCount, minorRadius, majorRadius, (double t) {
    return new Math.Point3(cos(t), sin(t), 0.0);
  });
}

Shape knot({int minorCount: 12, int majorCount: 120, double minorRadius: 0.3, double majorRadius: 1.0,
    double minorTurns: 3.0, double majorTurns: 2.0}) {
  return cylindicalPath(minorCount, majorCount, minorRadius, majorRadius, (double t) {
    double scalar = 2.0 + cos(minorTurns*t);
    return new Math.Point3(scalar*cos(majorTurns*t)/2.0,
                           scalar*sin(majorTurns*t)/2.0,
                           sin(minorTurns*t)/2.0);
  });
}

Shape cylindicalPath(int minorCount, int majorCount, double minorRadius, double majorRadius, func1PntHandle pathHndl) {
  Shape shape = surface(minorCount, majorCount, (double u, double v) {
    double majorAngle = u*2.0*PI;
    Math.Point3 cur = pathHndl(majorAngle)*majorRadius;
    Math.Point3 next = pathHndl(majorAngle + PI/majorCount)*majorRadius;
    Math.Vector3 heading = new Math.Vector3.fromPoint3(next - cur).normal();

    Math.Vector3 other = new Math.Vector3(1.0, 0.0, 0.0);
    if (heading != other) {
      other = new Math.Vector3(0.0, 0.0, 1.0);
    }
    Math.Vector3 cross = heading.cross(other).normal();
    other = cross.cross(heading).normal();

    var minorAngle = v*2.0*PI;
    var minorCos = cos(minorAngle)*minorRadius;
    var minorSin = sin(minorAngle)*minorRadius;
    return cur + new Math.Point3.fromVector3(other*minorCos + cross*minorSin);
  });
  if (shape == null) return null;
  shape.calculateNormals();
  shape.adjustNormals();
  return shape;
}

Shape grid({int widthDiv: 4, int heightDiv: 4, func2Handle heightHndl: _flatGridHeightHandle}) {
  return surface(widthDiv, heightDiv, (double u, double v) =>
    new Math.Point3(u*2.0-1.0, heightHndl(u, v), v*2.0-1.0));
}

double _flatGridHeightHandle(double u, double v) => 0.0;

Shape surface(int widthDiv, int heightDiv, func2PntHandle locHndl) {
  if (widthDiv < 1) return null;
  if (heightDiv < 1) return null;
  Shape shape = new Shape();
  List<Vertex> vers = new List<Vertex>();
  for (int i = 0; i <= heightDiv; i++) {
    double u = i.toDouble()/heightDiv.toDouble();
    vers.add(shape.vertices.addNew(
      loc: locHndl(u, 0.0),
      txt: new Math.Point2(u, 0.0),
      clr: new Math.Color4(u, 0.0, 0.0)));
  }
  for (int i = 1; i <= widthDiv; i++) {
    double v = i.toDouble()/widthDiv.toDouble();
    for (int j = 0; j <= heightDiv; j++) {
      double u = j.toDouble()/heightDiv.toDouble();
      vers.add(shape.vertices.addNew(
        loc: locHndl(u, v),
        txt: new Math.Point2(u, v),
        clr: new Math.Color4(u, v, v)));
    }
  }
  shape.faces.addGrid(widthDiv+1, heightDiv+1, vers);
  return shape;
}